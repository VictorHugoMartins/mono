import psycopg2 as pg
import pandas as pd
import argparse
import datetime as dt
import logging
from general_config import ABConfig
import os.path
import os
import csv
import simplejson as json
from general_dict import columnDict
LOG_LEVEL = logging.INFO
# Set up logging
LOG_FORMAT = '%(levelname)-8s%(message)s'
logging.basicConfig(format=LOG_FORMAT, level=LOG_LEVEL)
DEFAULT_START_DATE = '2020-03-03'

def buildColumnsObject(columns):
    obj = []
    for column in columns:
        obj.append({
          "value": column,
          "label": columnDict[column]["label"],
          "type": columnDict[column]["type"],
        })
    return obj

def export_datatable(config, sql_command, params, project, toJson):
    try:
        rowcount = -1
        logging.info("Initializing export {project}'s rooms".format(project=project))
        conn = config.connect()
        cur = conn.cursor()
        cnxn = config.connect()
        print(sql_command, params if (type(params) == tuple) else ())
        cur.execute(sql_command, params if (type(params) == tuple) else ())
        
        if ( toJson ):
            results = cur.fetchall()

            # Cria um dicionário com os resultados
            data = []
            for row in results:
                d = {}
                for idx, col in enumerate(cur.description):
                    d[col[0]] = row[idx]
                data.append(d)
            conn.close()
            
            print(results)
            print(data[0].keys())

            

            if ( len(data) > 0):
              return { "columns": buildColumnsObject(data[0].keys()), "rows": data }
            else:
              return { "columns": [], "rows": []}
        else:
            # create a directory for all the data for the city
            directory = ('files/').format(project=project)
            if not os.path.isdir(directory): # if directory don't exists, create
                os.mkdir(directory)

            today = today = dt.date.today().isoformat()
            directory = directory + 'airbnb_rooms_{city}_12_05_2023.csv'.format(city=city)
            csv_path = directory

            # Busca os resultados da query e salva em um arquivo CSV
            with open(csv_path, 'w', newline='', encoding='utf-8') as csvfile:
                writer = csv.writer(csvfile)
                writer.writerow([d[0] for d in cur.description])
                for row in cur:
                    writer.writerow(row)

            # Fecha a conexão com o banco de dados
            cur.close()
            conn.close()

            logging.info("Finishing export")

            return directory
    except pg.errors.InFailedSqlTransaction:
        print("Falha ao realizar consulta")
        return { "columns": [], "rows": []}
    except PermissionError:
        print("Permission denied: ", directory, " is open")
        return { "columns": [], "rows": []}

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
    parser.add_argument('-ss', '--ss_id',
                        metavar='city', action='store',
                        help="""id of super_survey to export""")
    parser.add_argument('-la', '--listings_airbnb',
                        action='store_true', default=False,
                        help="export the listings from airbnb")
    parser.add_argument('-lb', '--listings_booking',
                        action='store_true', default=False,
                        help="export the listings from booking")
    parser.add_argument('-ra', '--reviews_airbnb',
                        action='store_true', default=False,
                        help="export the reviews from airbnb")
    parser.add_argument('-rb', '--reviews_booking',
                        action='store_true', default=False,
                        help="export the reviews from booking")
    parser.add_argument('-p', '--project',
                        metavar='project', action='store', default="public",
                        help="""the project determines the table or view: public
                        for room, gis for listing_city, default public""")
    parser.add_argument('-f', '--format',
                        metavar='format', action='store', default="csv",
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
    export_datatable(ab_config, """
      SELECT
          room_id,
          STRING_AGG(DISTINCT CAST(host_id AS varchar), 'JOIN ') AS host_id,
          STRING_AGG(DISTINCT name, 'JOIN ') AS names,
          STRING_AGG(DISTINCT property_type, 'JOIN ') AS property_types,
          STRING_AGG(DISTINCT room_type, 'JOIN ') AS room_types,
          AVG(price) AS price,
          AVG(minstay) AS minstay,
          AVG(reviews) AS reviews,
          AVG(avg_rating) AS rating,
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
          locality, location.sublocality, location.route, location.location_id, room_id
    """, 'Ouro Preto', args.project.lower())

if __name__ == "__main__":
    main()


# SELECT
#         room_id,
#         STRING_AGG(DISTINCT room_name, 'JOIN ') AS hotel_names,
# 		STRING_AGG(DISTINCT hotel_name, 'JOIN ') AS room_names,
#         STRING_AGG(DISTINCT property_type, 'JOIN ') AS property_types,
#         STRING_AGG(DISTINCT room_type, 'JOIN ') AS room_types,
#         AVG(price) AS avg_price,
#         AVG(reviews) AS avg_reviews,
#         AVG(overall_satisfaction) AS avg_rating,
#         AVG(accommodates) AS avg_accommodates,
#         AVG(bedrooms) AS avg_bedrooms,
#         AVG(bathrooms) AS avg_bathrooms,
#        	AVG(latitude) AS avg_latitude,
#         AVG(longitude) AS avg_longitude,
#         STRING_AGG(DISTINCT comodities, 'JOIN ') AS comodities,
# 		STRING_AGG(DISTINCT bed_type, 'JOIN ') AS room_types,
# 		STRING_AGG(DISTINCT checkin_date, 'JOIN ') AS checkin_date,
# 		STRING_AGG(DISTINCT checkout_date, 'JOIN ') AS checkout_dates
#       FROM
#         booking_room
#       GROUP BY
#         room_id;


# perguntar plataformas (airbnb/booking/both)
  # se incluir booking, PODE incluir start and finish date
# perguntar cidade
# perguntar se é pra incluir sublocality/route
# perguntar campos para exportação
# perguntar se exporta todas as super_surveys juntas
  # p cada pesquisa especifica, pergunta se exporta todos (incluindo repetidos), se media, maior ou menor


# preciso definir como exportar uma ss_id especifica e todas as ss_ids do usuários
  # -1 para todas, N para especifica?
# como vai exportar airbnb e booking juntos?? e revisar booking sozinho kk

# quer continuar pesquisa q terminou em status diferente de "totalmente concluída? passe o ss_id"


# TELAS INTERESSANTES
  # cadastro
  # login
  # listagem (verificar andamento, cancelar, continuar)
  # iniciar nova pesquisa
  # editar/remover dados