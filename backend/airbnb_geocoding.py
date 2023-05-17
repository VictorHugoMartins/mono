#! /usr/bin/python3
"""
Reverse geocoding
"""

import geopy
from geopy.geocoders import Nominatim
from functools import partial

import googlemaps
import argparse
import json
from general_config import ABConfig
import sys
import logging
import os
import psycopg2
from utils import select_command, update_command

FORMAT_STRING = "%(asctime)-15s %(levelname)-8s%(message)s"
logging.basicConfig(level=logging.INFO, format=FORMAT_STRING)
logger = logging.getLogger()

# Suppress informational logging from requests module
logging.getLogger("requests").setLevel(logging.WARNING)
logging.getLogger("urllib3").setLevel(logging.WARNING)

class Location():

		def __init__(self, lat_round, lng_round):
				self.id = None
				self.lat_round = lat_round
				self.lng_round = lng_round
				self.neighborhood = None
				self.sublocality = None
				self.locality = None
				self.level2 = None
				self.level1 = None
				self.country = None
				self.route = None
				self.postcode = None

		def __init__(self, config, lat_round, lng_round):
				self.config = config
				self.id = None
				self.lat_round = lat_round
				self.lng_round = lng_round
				self.neighborhood = None
				self.sublocality = None
				self.locality = None
				self.level2 = None
				self.level1 = None
				self.country = None
				self.route = None
				self.postcode = None

		
		def save(self, insert_replace_flag):
			"""
			Save a listing in the database. Delegates to lower-level methods
			to do the actual database operations.
			Return values:
				True: listing is saved in the database
				False: listing already existed
			"""
			self.__insert()
			try:
				rowcount = -1

				'''if insert_replace_flag == self.config.FLAGS_INSERT_REPLACE:
					rowcount = self.__update()'''
				if (rowcount == 0 or
						insert_replace_flag == self.config.FLAGS_INSERT_NO_REPLACE):
					try:
						# self.get_address()
						self.__insert()
						return True
					except psycopg2.IntegrityError:
						logger.debug("Room " + str(self.room_name) + ": already collected")
						return False
			except psycopg2.OperationalError:
				# connection closed
				logger.error("Operational error (connection closed): resuming")
				del (self.config.connection)
			except psycopg2.DatabaseError as de:
				self.config.connection.conn.rollback()
				logger.erro(psycopg2.errorcodes.lookup(de.pgcode[:2]))
				logger.error("Database error: resuming")
				del (self.config.connection)
			except psycopg2.InterfaceError:
				# connection closed
				logger.error("Interface error: resuming")
				del (self.config.connection)
			except psycopg2.Error as pge:
				# database error: rollback operations and resume
				self.config.connection.conn.rollback()
				logger.error("Database error: " + str(self.room_id))
				logger.error("Diagnostics " + pge.diag.message_primary)
				del (self.config.connection)
			except (KeyboardInterrupt, SystemExit):
				raise
			except UnicodeEncodeError as uee:
				logger.error("UnicodeEncodeError Exception at " +
							str(uee.object[uee.start:uee.end]))
				raise
			except ValueError:
				logger.error("ValueError for room_id = " + str(self.room_id))
			except AttributeError:
				logger.error("AttributeError")
				raise
			except Exception:
				self.config.connection.rollback()
				logger.error("Exception saving room")
				raise

		def insert(self):
			""" Insert a room into the database. Raise an error if it fails """
			try:
				print(self.route, self.sublocality, self.locality, self.level1, self.level2, self.country)
				location_id = None
				logger.debug("Inserting location")
				# logger.debug("\tlocation: {}".format(self.address))
				conn = self.config.connect()
				cur = conn.cursor()
				sql = """
							INSERT INTO LOCATION(route, sublocality, locality, level1, level2, country)
								values (%s, %s, %s, %s, %s, %s)
							ON CONFLICT (route, sublocality, locality, level1, country)
							DO UPDATE SET
									route = excluded.route,
									sublocality=excluded.sublocality,
									locality=excluded.locality,
									level1=excluded.level1,
									country=excluded.country
							RETURNING location_id"""
				insert_args = (
					self.route, self.sublocality, self.locality, self.level1, self.level2, self.country
					)
				cur.execute(sql, insert_args)
				
				location_id = cur.fetchone()[0]
				
				cur.close()
				conn.commit()
				logger.debug("Location %s, %s inserted".format(
						lat=self.route, lng=self.sublocality))
			except psycopg2.errors.UniqueViolation:
				logger.info("Location {lat}, {lng}: already exists".format(
						lat=self.route, lng=self.sublocality))
				conn.rollback()
				cur.close()
			except psycopg2.IntegrityError:
				logger.info("Location {lat}, {lng}: insert failed".format(
						lat=self.route, lng=self.sublocality))
				conn.rollback()
				cur.close()
				raise
			except:
				conn.rollback()
				raise
			finally:
				return location_id


		@classmethod
		def from_db(cls, lat_round, lng_round):
				"""
				Get a location (address etc) by reading from the database
				"""
				return cls(lat_round, lng_round)

		def reverse_geocode(self, config):
				"""
				Return address information from the Google API as a Location object for a given lat lng
				"""
				# gmaps = googlemaps.Client(key=config.GOOGLE_API_KEY)
				# # Look up an address with reverse geocoding
				# # lat = 41.782
				# # lng = -72.693

				# results = gmaps.reverse_geocode((self.lat_round, self.lng_round))

				geolocator = Nominatim(user_agent="airbnb_and_booking_scrap")
				reverse = partial(geolocator.reverse, language="es")
				if ( (self.lat_round is not None) and (self.lng_round is not None )):
						try:
								address = reverse(self.lat_round + ", " + self.lng_round)
						except geopy.exc.GeocoderUnavailable:
								print("Failed to reverse geocode")
								raise
				else:
						return

				if address is not None:
						try:
							if (address.raw['address']['road']): self.route = address.raw['address']['road']
						except KeyError:
							pass

						try:
							if (address.raw['address']['neighbourhood']): self.neighbourhood = address.raw['address']['neighbourhood']
						except KeyError:
							pass
						
						try:
							if (address.raw['address']['suburb']): self.sublocality = address.raw['address']['suburb']
						except KeyError:
							pass
						
						try:
							if (address.raw['address']['town']): self.locality = address.raw['address']['town']
						except KeyError:
							pass
						
						try:
							if (address.raw['address']['municipality']): self.level2 = address.raw['address']['municipality']
						except KeyError:
							pass
						
						try:
							if (address.raw['address']['state']): self.level1 = address.raw['address']['state']
						except KeyError:
							pass
						
						try:
							if (address.raw['address']['postcode']): self.postcode = address.raw['address']['postcode']
						except KeyError:
							pass
						
						try:
							if (address.raw['address']['country']): self.country = address.raw['address']['country']
						except KeyError:
							pass
	
		def reverse_geocode_from_google(self, config):
				"""
				Return address information from the Google API as a Location object for a given lat lng
				"""
				gmaps = googlemaps.Client(key=config.GOOGLE_API_KEY)
				# Look up an address with reverse geocoding
				# lat = 41.782
				# lng = -72.693

				results = gmaps.reverse_geocode((self.lat_round, self.lng_round))

				# Parsing the result is described at
				# https://developers.google.com/maps/documentation/geocoding/web-service-best-practices#ParsingJSON

				json_file = open("geocode.json", mode="w", encoding="utf-8")
				json_file.write(json.dumps(results, indent=4, sort_keys=True))
				json_file.close()
				#  In practice, you may wish to only return the first result (results[0])

				if (len(results)) > 0:
						for result in results:
								if (self.neighborhood is not None and
												self.sublocality is not None and
												self.locality is not None and
												self.level2 is not None and
												self.level1 is not None and
												self.country is not None):
										break
								address_components = result['address_components']
								for address_component in address_components:
										if (self.neighborhood is None
												and "neighborhood" in address_component["types"]):
												self.neighborhood = address_component["long_name"]
										elif (self.sublocality is None
													and "sublocality" in address_component["types"]):
												self.sublocality = address_component["long_name"]
										elif (self.locality is None
													and "locality" in address_component["types"]):
												self.locality = address_component["long_name"]
										elif (self.level2 is None
													and "administrative_area_level_2" in
													address_component["types"]):
												self.level2 = address_component["long_name"]
										elif (self.level1 is None
													and "administrative_area_level_1" in
													address_component["types"]):
												self.level1 = address_component["long_name"]
										elif (self.country is None
													and "country" in address_component["types"]):
												self.country = address_component["long_name"]
										elif (self.route is None
													and "route" in address_component["types"]):
												self.route = address_component["long_name"]

				os.remove('geocode.json')

		def insert_in_search_area(self, config):
				# insert country
				bounding_box = BoundingBox.from_geopy(config, self.country)
				bounding_box.add_search_area(config, self.country)

				# insert country
				bounding_box = BoundingBox.from_geopy(config, self.level1 + ', ' + self.country)
				bounding_box.add_search_area(config, self.level1 + ', ' + self.country)

				# insert country
				bounding_box = BoundingBox.from_geopy(config, self.level2 + ', ' + self.level1)
				bounding_box.add_search_area(config, self.level2 + ', ' + self.level1)

				# insert country
				bounding_box = BoundingBox.from_geopy(config, self.sublocality + ', ' + self.level2)
				bounding_box.add_search_area(config, self.sublocality + ', ' + self.level2)

		def get_country(self):
				return self.country

		def get_level2(self):
				return self.level2

		def get_level1(self):
				return self.level1

		def get_neighborhood(self):
				return self.neighborhood

		def get_sublocality(self):
				return self.sublocality

		def get_route(self):
				return self.route

		def get_sublocality_id(self, config):
				try:
						rowcount = -1
						#logging.info("Adding location to database")
						conn = config.connect()
						cur = conn.cursor()
						
						# check if it exists
						cur.execute(""" select sublocality_id from sublocality where sublocality_name = %s """, (self.sublocality,))
						rowcount = cur.rowcount
						
						if rowcount > 0:
								( sublocality_id ) = cur.fetchone()[0]
								return sublocality_id
				except:
						logger.exception("Exception in get sublocality")
						raise


class BoundingBox():
		"""
		Get max and min lat and long for a search area
		"""

		def __init__(self, bounding_box):
				(self.bb_s_lat,
				 self.bb_n_lat,
				 self.bb_w_lng,
				 self.bb_e_lng) = bounding_box

		@classmethod
		def from_db(cls, config, search_area):
				"""
				Get a bounding box from the database by reading the search_area.name
				"""
				try:
						cls.search_area = search_area
						conn = config.connect()
						cur = conn.cursor()
						sql = """
						SELECT bb_s_lat, bb_n_lat, bb_w_lng, bb_e_lng
						FROM search_area
						WHERE name = %s
						"""
						cur.execute(sql, (search_area,))
						bounding_box = cur.fetchone()
						cur.close()
						return cls(bounding_box)
				except:
						logger.exception("Exception in BoundingBox_from_db: exiting")
						sys.exit()

		@classmethod
		def from_google(cls, config, search_area):
				"""
				Get a bounding box from Google
				"""
				try:
						gmaps = googlemaps.Client(key=config.GOOGLE_API_KEY)
						results = gmaps.geocode((search_area))

						bounds = results[0]["geometry"]["bounds"]
						bounding_box = (bounds["southwest"]["lat"],
														bounds["northeast"]["lat"],
														bounds["southwest"]["lng"],
														bounds["northeast"]["lng"],)
						return cls(bounding_box)
				except IndexError:
						try:
								bounds = results[0]["geometry"]["viewport"]
								bounding_box = (bounds["southwest"]["lat"],
																bounds["northeast"]["lat"],
																bounds["southwest"]["lng"],
																bounds["northeast"]["lng"],)
								return cls(bounding_box)
						except IndexError:
								return None
				except KeyError:
						bounds = results[0]["geometry"]["viewport"]
						bounding_box = (bounds["southwest"]["lat"],
														bounds["northeast"]["lat"],
														bounds["southwest"]["lng"],
														bounds["northeast"]["lng"],)
						return cls(bounding_box)
				except:
						logger.exception("Exception in BoundingBox_from_google: exiting")
						sys.exit()

		@classmethod
		def from_geopy(cls, config, search_area):
				"""
				Get a bounding box from Google
				"""
				try:
						# geolocator = Nominatim(user_agent="specify_your_app_name_here")
						geolocator = Nominatim(user_agent="airbnb_and_booking_scrap")
						location = geolocator.geocode((search_area))
						bounds = location.raw['boundingbox']

						bounding_box = (bounds[2],
														bounds[3],
														bounds[0],
														bounds[1],)
														
						return cls(bounding_box)
				except:
						logger.exception("Exception in BoundingBox_from_geopy: exiting")
						sys.exit()

		
		def from_reverse_geocode(config, room_id, lat, lng):
				try:

						gmaps = googlemaps.Client(key=config.GOOGLE_API_KEY)
						# Look up an address with reverse geocoding
						# lat = 41.782
						# lng = -72.693

						results = gmaps.reverse_geocode((lat, lng))

						# Parsing the result is described at
						# https://developers.google.com/maps/documentation/geocoding/web-service-best-practices#ParsingJSON

						json_file = open("geocode.json", mode="w", encoding="utf-8")
						json_file.write(json.dumps(results, indent=4, sort_keys=True))
						json_file.close()

						if (len(results)) > 0:
								bounds = results[0]["geometry"]["viewport"]
								bounding_box = (bounds["southwest"]["lat"],
																bounds["northeast"]["lat"],
																bounds["southwest"]["lng"],
																bounds["northeast"]["lng"],)

								conn = config.connect()
								cur = conn.cursor()

								sql = """SELECT name, sublocality_id from search_area, sublocality
												where bb_s_lat >= %s and bb_n_lat <= %s
												and bb_w_lng >= %s and bb_e_lng <= %s
												and sublocality_name is not null
												and strpos(name, 'Ouro Preto') <> 0
												limit 1"""
								args = (bounds["southwest"]["lat"],
												bounds["northeast"]["lat"],
												bounds["southwest"]["lng"],
												bounds["northeast"]["lng"],)
								cur.execute(sql, (args))
								results = cur.fetchall()
								
								for result in results:
										name = result[0]
										sublocality_id = result[1]


										''' sql = """update room set sublocality = %s, sublocality_id = %s where room_id = %s"""
										args = (name, sublocality_id, room_id)
										cur.execute(sql, (args))
										cur.close()
										conn.commit()'''
										logger.debug("Room " + str(room_id) + " updated. New sublocality: " + name)
				except:
						raise


		@classmethod
		def from_args(cls, config, args):
				"""
				Get a bounding box from the command line
				"""
				try:
						bounding_box = (args.bb_s_lat, args.bb_n_lat,
														args.bb_w_lng, args.bb_e_lng)
						return cls(bounding_box)
				except:
						logger.exception("Exception in BoundingBox_from_args: exiting")
						sys.exit()


		def add_search_area(self, config, search_area):
				try:
						#logging.info("Adding search_area to database as new search area")
						# Add the search_area to the database anyway
						conn = config.connect()
						cur = conn.cursor()
						# check if it exists
						sql = """
						select name
						from search_area
						where name = %s and bb_n_lat = %s and bb_e_lng = %s and bb_s_lat = %s and bb_w_lng = %s"""
						cur.execute(sql, (search_area, self.bb_n_lat,
								self.bb_e_lng,
								self.bb_s_lat,
								self.bb_w_lng))
						if cur.fetchone() is not None:
								logger.debug("Area already exists: {}".format(search_area))
								return True
						# Compute an abbreviation, which is optional and can be used
						# as a suffix for search_area views (based on a shapefile)
						# The abbreviation is lower case, has no whitespace, is 10 characters
						# or less, and does not end with a whitespace character
						# (translated as an underscore)
						abbreviation = search_area.lower()[:10].replace(" ", "_")
						while abbreviation[-1] == "_":
								abbreviation = abbreviation[:-1]

						# Insert the search_area into the table
						sql = """insert into search_area (name, abbreviation, bb_n_lat, bb_e_lng, bb_s_lat, bb_w_lng)
						values (%s, %s, %s, %s, %s, %s)"""
						cur.execute(sql, (search_area,
								abbreviation,
								self.bb_n_lat,
								self.bb_e_lng,
								self.bb_s_lat,
								self.bb_w_lng))
						sql = """select
						currval('search_area_search_area_id_seq')
						"""
						cur.execute(sql, ())
						search_area_id = cur.fetchone()[0]
						# city_id = cur.lastrowid
						cur.close()
						conn.commit()

						logger.debug("Search area {} added: search_area_id = {}"
									.format(search_area, search_area_id))
									 
				except Exception:
						logger.debug("Error adding search area to database")
						raise


def insert_country(country, config):
		"""
		Insert a country
		"""

		try:
				rowcount = -1
				#logging.info("Adding country to database")
				conn = config.connect()
				cur = conn.cursor()
				# check if it exists
				sql = """ SELECT country_id from country where country_name = %s limit 1"""
				cur.execute(sql, (country,))
				rowcount = cur.rowcount
				
				if rowcount > 0:
						(country_id) = cur.fetchone()[0]
						logger.debug("Country {} already exists".format(country))
						return country_id + 1

				sql = """ SELECT max(country_id) from country limit 1"""
				cur.execute(sql)
				result = cur.fetchall()

				country_id = result[0][0]

				if country_id is None:
						country_id = 0

				sql = """ INSERT into country(country_id, country_name) VALUES (%s+1, %s) """
				insert_args = (country_id, country)
				logger.debug(insert_args)
				cur.execute(sql, insert_args)
				cur.close()
				conn.commit()
				logger.debug("Country ", country_id+1, " inserted")

				# insert sublocality in the list of search areas
				bounding_box = BoundingBox.from_geopy(config, country)
				bounding_box.add_search_area(config, country)
				
				return country_id
		except:
				logger.exception("Exception in insert_country")
				raise


def insert_level1(config, level1, country_id, country):
		"""
		Insert a level1
		"""
		try:
				rowcount = -1
				#logging.info("Adding level1 to database")
				conn = config.connect()
				cur = conn.cursor()

				name = level1 + ", " + country

				# check if it exists
				sql = """ SELECT level1_id from level1 where level1_name = %s limit 1"""
				cur.execute(sql, (name,))
				rowcount = cur.rowcount

				if rowcount > 0:
						(level1_id) = cur.fetchone()[0]
						logger.debug("Level1 {} already exists".format(name))
						return level1_id + 1

				sql = """ SELECT max(level1_id) from level1 limit 1"""
				cur.execute(sql)
				result = cur.fetchall()

				level1_id = result[0][0]

				if level1_id is None:
						level1_id = 0

				sql = """ INSERT into level1(level1_id, level1_name, country_id) VALUES (%s+1, %s, %s) """
				insert_args = (level1_id, name, country_id)
				logger.debug(insert_args)
				cur.execute(sql, insert_args)
				cur.close()
				conn.commit()
				logger.debug("Level1 ", level1_id+1, " inserted")

				# insert sublocality in the list of search areas
				bounding_box = BoundingBox.from_geopy(config, name)
				bounding_box.add_search_area(config, name) # for example, "Bauxita, Ouro Preto"
				
				return level1_id + 1
		except:
				logger.exception("Exception in insert_level1")
				raise


def insert_level2(config, level2, level1_id, level1):
		"""
		Insert a level1
		"""
		try:
				rowcount = -1
				#logging.info("Adding level2 to database")
				conn = config.connect()
				cur = conn.cursor()

				name = level2 + ", " + level1

				# check if it exists
				sql = """ SELECT level2_id from level2 where level2_name = %s limit 1"""
				cur.execute(sql, (name,))
				rowcount = cur.rowcount

				if rowcount > 0:
						( level2_id ) = cur.fetchone()[0]
						logger.debug("Level2 {} already exists".format(name))
						return level2_id + 1

				sql = """ SELECT max(level2_id) from level2 limit 1"""
				cur.execute(sql)
				result = cur.fetchall()

				level2_id = result[0][0]

				if level2_id is None:
						level2_id = 0

				sql = """ INSERT into level2(level2_id, level2_name, level1_id) VALUES (%s+1, %s, %s) """
				insert_args = (level2_id, name, level1_id)
				logger.debug(insert_args)
				cur.execute(sql, insert_args)
				cur.close()
				conn.commit()
				logger.debug("Level2 ", level2_id+1, " inserted")

				# insert sublocality in the list of search areas
				bounding_box = BoundingBox.from_geopy(config, name)
				bounding_box.add_search_area(config, name) # for example, "Bauxita, Ouro Preto"
				
				return level2_id + 1
		except:
				logger.exception("Exception in insert_level2")
				raise


def insert_sublocality(config, sublocality, level2_id, level2):
		"""
		Insert a sublocality
		"""
		try:
				rowcount = -1

				#logging.info("Adding sublocality to database")
				conn = config.connect()
				cur = conn.cursor()

				name = sublocality + ", " + level2

				# check if it exists
				sql = """ SELECT sublocality_id from sublocality where sublocality_name = %s limit 1 """
				cur.execute(sql, (name,))
				rowcount = cur.rowcount

				if rowcount > 0:
						( sublocality_id ) = cur.fetchone()[0]
						logger.debug("Level2 {} already exists".format(name))
						return sublocality_id + 1

				sql = """ SELECT max(sublocality_id) from sublocality limit 1"""
				cur.execute(sql)
				result = cur.fetchall()

				sublocality_id = result[0][0]

				if sublocality_id is None:
						sublocality_id = 0

				sql = """ INSERT into sublocality(sublocality_id, sublocality_name, level2_id) VALUES (%s+1, %s, %s) """
				insert_args = (sublocality_id, name, level2_id)
				logger.debug(insert_args)
				cur.execute(sql, insert_args)
				cur.close()
				conn.commit()
				logger.debug("Sublocality ", sublocality_id+1, " inserted")

				# insert sublocality in the list of search areas
				bounding_box = BoundingBox.from_geopy(config, name)
				bounding_box.add_search_area(config, name) # for example, "Bauxita, Ouro Preto"
				
				return sublocality_id + 1
		except:
				logger.exception("Exception in insert_sublocality")
				raise

def get_coordinates_list_and_update_database(config, platform="Airbnb", survey_id=1):
		print("aqui")
		coordinates_list = select_command(config,
						sql_script="""SELECT DISTINCT latitude, longitude, room_id from room where survey_id >= %s and location_id is null""" if platform == "Airbnb" else """SELECT DISTINCT latitude, longitude from booking_room where survey_id >= %s""",
						params=((survey_id,)),
						initial_message="Selecting coordinates list from " + platform + " to update location ids",
						failure_message="Failed to search coordinates list")
		for coordinate in coordinates_list:
			lat = coordinate[0]
			lng = coordinate[1]
			room_id = coordinate[2]
			if ( lat is not None) and (lng is not None):
					reverse_geocode_coordinates_and_update_airbnb_room(config, lat, lng, room_id)

def reverse_geocode_coordinates_and_update_airbnb_room(config, lat, lng, room_id):
		location = Location(config, str(lat), str(lng)) 
		location.reverse_geocode(config)

		location_id = select_command(config,
						sql_script="""SELECT location_id FROM location
													WHERE (route is null or route = %s) AND
																(sublocality is null or sublocality = %s) and
																(locality is null or locality = %s) and
																(level1 is null or level1 = %s ) and
																(level2 is null or level2 = %s ) and
																(country is null or country = %s )""",
						params=((location.route, location.sublocality, location.locality, location.level1, location.level2, location.country,)),
						initial_message="Selecting coordinates list to update location ids",
						failure_message="Failed to search coordinates list")
		if ( len(location_id) == 0): location_id = location.insert()
		else: location_id = location_id[0][0]
		print("o location id", location_id, room_id)

		update_airbnb_room_with_location_id(config, room_id, location_id)

def update_airbnb_room_with_location_id(config, room_id, location_id):
		update_command(config,
									sql_script="""
															update room
															set location_id = %s where room_id = %s
														""",
									params=(location_id, room_id,),
									initial_message="Updating location_id of room: " + str(room_id) + " for " + str(location_id),
									failure_message="Failed to save room as deleted")

def reverse_geocode_coordinates_and_insert(config, lat, lng):
		location = Location(config, str(lat), str(lng)) 
		location.reverse_geocode(config)
		return location.insert()

def get_coordinates_list(config, platform="Airbnb", survey_id=1):
		return select_command(config,
						sql_script="""SELECT DISTINCT latitude, longitude from room where survey_id >= %s""" if platform == "Airbnb" else """SELECT DISTINCT latitude, longitude from booking_room where survey_id >= %s""",
						params=((survey_id,)),
						initial_message="Selecting coordinates list from " + platform,
						failure_message="Failed to search coordinates list")

def identify_and_insert_locations(config, platform, survey_id):
	coordinates_list = get_coordinates_list(config, platform, survey_id)
	for coordinate in coordinates_list:
			lat = coordinate[0]
			lng = coordinate[1]
			if ( lat is not None) and (lng is not None):
					reverse_geocode_coordinates_and_insert(config, lat, lng)

def main():
		""" Controlling routine that calls the others """
		
		config = ABConfig()
		parser = argparse.ArgumentParser(
				description='reverse geocode')
				# usage='%(prog)s [options]')
		# These arguments should be more carefully constructed. Right now there is
		# no defining what is required, and what is optional, and what contradicts
		# what.
		
		parser.add_argument("--sa",
												metavar="search_area", type=str,
												help="""search_area""") # para implementar
		parser.add_argument("--lat",
												metavar="lat", type=float,
												help="""lat""")
		parser.add_argument("--lng",
												metavar="lng", type=float,
												help="""lng""")
		parser.add_argument("--bb_n_lat",
												metavar="bb_n_lat", type=float,
												help="""bb_n_lat""") # para implementar
		parser.add_argument("--bb_s_lat",
												metavar="bb_s_lat", type=float,
												help="""bb_s_lat""") # para implementar
		parser.add_argument("--bb_e_lng",
												metavar="bb_e_lng", type=float,
												help="""bb_e_lng""") # para implementar
		parser.add_argument("--bb_w_lng",
												metavar="bb_w_lng", type=float,
												help="""bb_w_lng""") # para implementar
		parser.add_argument("--count",
												metavar="count", type=int,
												help="""number_of_lookups""") # para implementar
		parser.add_argument("--update",
												metavar="update", type=int,
												help="""update locations from search area""")
		parser.add_argument("--insert",
												metavar="insert", type=str,
												help="""insert search area""")
		args = parser.parse_args()

		if args.update:
				results = select_rooms(config, args.update)
		elif args.insert:
				bounding_box = BoundingBox.from_geopy(config, args.insert)
				logger.info("Bounding box for %s from Google = (%s, %s, %s, %s)",
										args.insert,
										bounding_box.bb_s_lat, bounding_box.bb_n_lat,
										bounding_box.bb_w_lng, bounding_box.bb_e_lng)
				bounding_box.add_search_area(config, args.insert)

if __name__ == "__main__":
		main()

# selecionar route, sublocality e tal só quando for exportar os dados