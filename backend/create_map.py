import pandas as pd
import folium
from folium.plugins import MarkerCluster
from folium import Popup
from branca.element import Figure

#!/usr/bin/python
import psycopg2 as pg
import argparse
import datetime as dt
import logging
from general_config import ABConfig
import os.path
from folium import plugins

LOG_LEVEL = logging.INFO
# Set up logging
LOG_FORMAT = '%(levelname)-8s%(message)s'
logging.basicConfig(format=LOG_FORMAT, level=LOG_LEVEL)
DEFAULT_START_DATE = '2017-05-02'
today = dt.date.today().isoformat()

def map(directory, n_clusters):
	fig2=Figure(width=550,height=350)
	m = folium.Map(
		location=[-20.3856, -43.5035],
		zoom_start=11
	)
	coordenadas = []

	colors = ['black', 'beige', 'blue']
	data = pd.read_excel(directory)
	clusters = data['cluster'].unique().tolist()
	mc = MarkerCluster()
	print("Creating map...")
	for x, color in zip(clusters, colors):
		tmp_data = data[data.cluster == x]
		for index, room in tmp_data.iterrows():
			coordenadas.append([room['latitude'], room['longitude']])
			mc.add_child(folium.Marker([room['latitude'], room['longitude']], 
			popup = Popup(str(room['room_id'])), # show = True pra ficar naturalmente ativado
			tooltip=room['name'],
			tyles='openstreetmap',
			icon=folium.Icon(color=color))).add_to(m)
	fig2.add_child(m)
	folium.TileLayer('Stamen Terrain').add_to(m)
	folium.TileLayer('Stamen Toner').add_to(m)
	folium.TileLayer('Stamen Water Color').add_to(m)
	folium.TileLayer('cartodbpositron').add_to(m)
	folium.TileLayer('cartodbdark_matter').add_to(m)
	folium.LayerControl().add_to(m)
	m.save('public/data/map/mapa_{n_clusters}_clusters_{today}.html'.format(n_clusters=n_clusters, today=today))

def create_map(table):
	data = pd.read_csv(table)
	data.head()
	data = data.drop(columns=['Unnamed: 0']) #, 'host_id', 'room_type'
	#data.rename(columns={'sublocality':'Bairro', 'route':'Rua', 'latitude':'Lat', 'longitude':'Lng'}, inplace=True)
	data.head()

	'''pattern = r"[Cc][Mm][Ee][Ii]"
	data = data[data['Name'].str.contains(pattern)]
	data.dropna(inplace=True)
	data = data.loc[(data['Lat'] < -5) & (data['Lat'] > -6) & (data['Lng'] < -35) & (data['Lng'] > -36), :]
	where latitude <= -20.3699597 and latitude >= -20.4126148
	and longitude <= -43.4719237 and longitude >= -43.5313676
	data.head()'''

	m = folium.Map(
		location=[-20.3856, -43.5035],
		zoom_start=11
	)	
	mc = MarkerCluster()
		
	i = 0
	for index, room in data.iterrows():
		i = i + 1
		if ( i >= 370 ):
			mc.add_child(folium.Marker([room['Lat'], room['Lng']], 
						  popup=str(room['room_id']),
						  tooltip=room['name'],
						  tyles='openstreetmap',
						  icon=folium.Icon(color='black'))).add_to(m)
			m
		else:
			mc.add_child(folium.Marker([room['Lat'], room['Lng']], 
						  popup=str(room['room_id']),
						  tooltip=room['name'],
						  tyles='openstreetmap',
						  icon=folium.Icon(icon='home', color='beige'))).add_to(m)
			m

	m.save('public/data/map_2020-05-28.html')

def heatMap(data, coordenadas):
	mapa = folium.Map(location=[-20.3856, -43.5035],
		zoom_start=11,tiles='Stamen Toner')
	mapa.add_child(plugins.HeatMap(coordenadas))        
	mapa.save('public/data/map/mapa_{today}.html'.format(today=today))

def create_files(config, city, table, project, format):
	try:
		rowcount = -1
		logging.info("Initializing export")
		conn = config.connect()
		cur = conn.cursor()
   
		if table == 'booking':
			sql = """SELECT room_id, latitude, longitude, name, room_name from booking_room where city = '{city}'
					and latitude is not null
					and longitude is not null
					order by room_id""".format(city=city)
			# """SELECT distinct(room_id), latitude, longitude, name, room_name from booking_room where city = '{city}'
			#        order by room_id""".format(city=city)
		else:
			sql = """SELECT room_id, latitude, longitude, name from room where city = '{city}' and latitude is not null
					and longitude is not null
					and latitude is not null
					and longitude is not null
					order by room_id""".format(city=city)
		# create a directory for reviews
		directory = ('{project}/data/map/').format(project=project)
		if not os.path.isdir(directory): # if directory don't exists, create
			os.mkdir(directory)

		directory = directory + '{table}_{city}_{today}.xlsx'.format(table=table,city=city,today=today)
		pd.read_sql(sql,conn).to_excel(directory, sheet_name="Total Listings")

		logging.info("Finishing export")

		return directory
	except PermissionError:
		print("Permission denied: ", directory, " is open")
	except Exception:
		logging.error("Failed to export reviews")
		raise

def main():
	parser = \
		argparse.ArgumentParser(
			description="Create a spreadsheet of surveys from a city")
	parser.add_argument("-cfg", "--config_file",
						metavar="config_file", action="store", default=None,
						help="""explicitly set configuration file, instead of
						using the default <username>.config""")
	parser.add_argument('-c', '--city',
						metavar='city', action='store',
						help="""set the city""")
	parser.add_argument('-fl', '--file_directory',
						metavar='file', action='store',
						help="""not export database, but read file with Airbnb rooms""")
	parser.add_argument('-p', '--project',
						metavar='project', action='store', default="public",
						help="""the project determines the table or view: public
						for room, gis for listing_city, default public""")
	parser.add_argument('-f', '--format',
						metavar='format', action='store', default="xlsx",
						help="""output format (xlsx or csv), default xlsx""")
	parser.add_argument('-s', '--summary',
						action='store_true', default=False,
						help="create a summary spreadsheet instead of raw data")
	parser.add_argument('-sd', '--start_date',
						metavar="start_date", action='store',
						default=DEFAULT_START_DATE,
						help="create a summary spreadsheet instead of raw data")
	args = parser.parse_args()
	ab_config = ABConfig(args)
	if args.file_directory:
		print(args)
		#if args.file_directory:
		colors = ['black', 'beige', 'blue']
		data = pd.read_excel(args.file_directory)
		clusters = data['cluster'].unique().tolist()
		for x, color in zip(clusters, colors):
			print("Creating map...")
			tmp_data = data[data.cluster == x]
			for index, room in tmp_data.iterrows():
				mc.add_child(folium.Marker([room['latitude'], room['longitude']], 
				popup = Popup(str(room['room_id'])), # show = True pra ficar naturalmente ativado
				tooltip=room['name'],
				tyles='openstreetmap',
				icon=folium.Icon(color=color))).add_to(m)
		print("Map saved")
	if args.city:
		directory_airbnb = create_files(ab_config, args.city, 'airbnb', args.project.lower(),
						args.format)
		directory_booking = create_files(ab_config, args.city, 'booking', args.project.lower(),
						args.format)

		airbnb = pd.read_excel('public/data/map/airbnb_{city}_{today}.xlsx'.format(city=args.city,today=today))
		airbnb = airbnb.drop(columns=['Unnamed: 0']) #, 'host_id', 'room_type'
		#airbnb.rename(columns={'sublocality':'Bairro', 'route':'Rua', 'latitude':'Lat', 'longitude':'Lng'}, inplace=True)
		airbnb.head()

		booking = pd.read_excel('public/data/map/booking_{city}_{today}.xlsx'.format(city=args.city,today=today))
		#booking = pd.read_csv(directory_booking)
		booking.head()
		booking = booking.drop(columns=['Unnamed: 0']) #, 'host_id', 'room_type'
		#booking.rename(columns={'sublocality':'Bairro', 'route':'Rua', 'latitude':'Lat', 'longitude':'Lng'}, inplace=True)
		booking.head()

		m = folium.Map(
			location=[-20.3856, -43.5035],
			zoom_start=11
		)	
		mc = MarkerCluster()
		for index, room in airbnb.iterrows():
			mc.add_child(folium.Marker([room['latitude'], room['longitude']], 
						  popup=str(room['room_id']),
						  tooltip=room['name'],
						  tyles='openstreetmap',
						  icon=folium.Icon(color='black'))).add_to(m)
			
		for index, room in booking.iterrows():
			mc.add_child(folium.Marker([room['latitude'], room['longitude']], 
						  popup=str(room['room_id']),
						  tooltip=room['name'],
						  tyles='openstreetmap',
						  icon=folium.Icon(color='beige'))).add_to(m)
		
	else:
		parser.print_help()

if __name__ == "__main__":
	main()