import re
import bs4
import time
import json
import string
import logging
import requests
import argparse
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import selenium
import psycopg2
from lxml import html
from selenium import webdriver
from general_config import ABConfig
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
from geopy import distance
import datetime as dt
from general_dict import get_airbnb_rooms_by_ss_id

ab_config = ABConfig()

logging = logging.getLogger()

def get_area_coordinates_from_db(config, area):
		conn = config.connect()
		cur = conn.cursor()

		sql = """SELECT bb_n_lat, bb_s_lat, bb_w_lng, bb_e_lng
						from search_area
						where name = %s
						limit 1""" # os q precisa atualizar
		cur.execute(sql, (area,))                
		result = cur.fetchall()

		lat_max = float(result[0][0])
		lat_min = float(result[0][1])
		lng_min = float(result[0][2])
		lng_max = float(result[0][3])

		return (lat_max, lat_min, lng_max, lng_min)

def is_inside(lat_center, lng_center, lat_test, lng_test, verbose=False):
		center_point = [{'lat': lat_center, 'lng': lng_center}]
		test_point = [{'lat': lat_test, 'lng': lng_test}]

		for radius in range(50):
				center_point_tuple = tuple(center_point[0].values()) # (-7.7940023, 110.3656535)
				test_point_tuple = tuple(test_point[0].values()) # (-7.79457, 110.36563)

				dis = distance.distance(center_point_tuple, test_point_tuple).km
				
				if dis <= radius:
						if ( verbose == True ):
								print("{} point is inside the {} km radius from {} coordinate".\
										format(test_point_tuple, radius/1000, center_point_tuple))
						return True
		return False

def select_command(config, sql_script, params, initial_message, failure_message):
		try:
				print(sql_script, (params))
				rowcount = -1
				logging.info(initial_message)
				conn = config.connect()
				cur = conn.cursor()

				sql = sql_script

				cur.execute(sql, (params))
				rowcount = cur.rowcount
				
				return cur.fetchall()
		except Exception:
				logging.error(failure_message)
				raise


def update_command(config, sql_script, params, initial_message, failure_message):
		try:
				id = None
				rowcount = -1
				logging.info(initial_message)
				conn = config.connect()
				cur = conn.cursor()
				
				cur.execute(sql_script, params)
				conn.commit()
				return id
		except Exception:
				logging.error(failure_message)
				raise
		finally:
				return id

def insert_command(config, sql_script, params, initial_message, failure_message):
		
				id = None
				rowcount = -1
				logging.info(initial_message)
				conn = config.connect()
				cur = conn.cursor()

				sql = sql_script
				cur.execute(sql, params)
				conn.commit()

				id = cur.fetchone()[0]
				cur.close()
				
				return id

def prepare_driver(url):
		'''Returns a Firefox Webdriver.'''
		options = Options()
		# options.add_argument('-headless')
		binary = FirefoxBinary('C:\\Program Files\\Mozilla Firefox\\firefox.exe')
		driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
		driver.get(url)
		time.sleep(5)
		return driver


def buildChartObjectFromValueCounts(obj):
		result = []
		for key in obj.keys():
			result.append({ "label": key, "value": obj[key]})
		return result

def send_nullable_value(data, key):
		try:
				return data[key]
		except:
				return None

def removeLastWordOfString(word, string):
		aux = string.split()
		if ( aux[-1] == word):
			return ''.join(string).rsplit(' ', 1)[0]
		else:
			return ''.join(string)

def buildFilterQuery(data):
		query = 'WHERE'
		params = []
		for key in data.keys():
			if ( key != 'ss_id'):
				if ( type(data[key]) == list):
					values = data[key]
					if ( len(values) > 1 ):
						range_list = []
						for k in range(0, len(values)):
							range_list.append(k)
						for i, element in zip(range_list, values):
							if ( i == 0):
								query = ''.join(query + " ( {column} = %s or".format(column=key))
								if ( i == (len(values)-1)):
									query = removeLastWordOfString('or', query)
									query = ''.join(query + ")".format(column=key))
							elif ( i == (len(values)-1)):
								query = ''.join(query + " {column} = %s ) and".format(column=key))
							else:
								query = ''.join(query + " {column} = %s  ".format(column=key))
							params.append(values[i])
					elif ( len(values) == 1):
							query = ''.join(query + " {column} = %s and".format(column=key, value=data[key][0]))
							params.append(data[key][0])
				else:
					query = removeLastWordOfString('or', query)
					query = ''.join(query + " {column} = %s and".format(column=key, value=data[key]))
					params.append(data[key])

		query = removeLastWordOfString('and', query)
		query = removeLastWordOfString('or', query)
		if ( query != 'WHERE'):
			return (query, tuple(params))
		return ('', ())

def asSelectObject(array):
	result = []
	for item in array:
		result.append({ "label": item[0], "value": item[0]})
	return result

def build_options(column, values, ss_id):
	if (values == ["min", "max"]):
		result = select_command(ab_config,
						sql_script="""WITH consulta AS ( SELECT
														room_id,
														STRING_AGG(DISTINCT CAST(host_id AS varchar), 'JOIN ') AS host_id,
														STRING_AGG(DISTINCT name, 'JOIN ') AS name,
														STRING_AGG(DISTINCT property_type, 'JOIN ') AS property_type,
														STRING_AGG(DISTINCT room_type, 'JOIN ') AS room_type,
														AVG(price) AS price,
														AVG(minstay) AS minstay,
														AVG(reviews) AS reviews,
														AVG(avg_rating) AS avg_rating,
														AVG(accommodates) AS accommodates,
														AVG(bedrooms) AS bedrooms,
														AVG(bathrooms) AS bathrooms,
														STRING_AGG(DISTINCT bathroom, 'JOIN ') AS bathrooms,
														MAX(latitude) AS latitude,
														MAX(longitude) AS longitude,
														STRING_AGG(DISTINCT extra_host_languages, 'JOIN ') AS extra_host_languages,
														AVG(CAST(is_superhost AS int)) AS is_superhost,
														STRING_AGG(DISTINCT comodities, 'JOIN ') AS comodities,
														location.location_id,
														location.route,
														location.sublocality,
														location.locality
													FROM
														room
												INNER JOIN location
												ON location.location_id = room.location_id
													GROUP BY
														locality, location.sublocality, location.route, location.location_id, room_id ) 
							SELECT min({column}), max({column}) FROM consulta
							""".format(column=column),
						params=(()),
						initial_message="Selecionando valores mínimo e máximo para " + str(column),
						failure_message="Falha ao selecionar valores mínimo e máximo para " + str(column))
		return (result[0][0], result[0][1])
	elif ( values == ["options"]):
		return asSelectObject(select_command(ab_config,
						sql_script="""with consulta as ( {consulta} ) 
							select distinct({column}) from consulta
							""".format(consulta=get_airbnb_rooms_by_ss_id(ss_id), column=column),
						params=(()),
						initial_message="Selecionando valores mínimo e máximo para " + str(column),
						failure_message="Falha ao selecionar valores mínimo e máximo para " + str(column)))



