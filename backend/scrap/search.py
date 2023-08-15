import logging
import argparse
import sys
from config.general_config import ABConfig
from scrap.airbnb.airbnb_survey import ABSurveyByBoundingBox
from scrap.geocoding import BoundingBox
from scrap.airbnb.airbnb_score import airbnb_score_search
from scrap.booking.booking import search_booking_rooms
from utils.sql_commands import select_command, update_command, insert_command
from utils.general_dict import statusDict

ab_config = ABConfig()
SCRIPT_VERSION_NUMBER = "5.0"


def db_ping(config):
    """
    Test database connectivity, and print success or failure.
    """
    try:
        conn = config.connect()
        if conn is not None:
            print("Connection test succeeded: {db_name}@{db_host}"
                  .format(db_name=config.DB_NAME, db_host=config.DB_HOST))
        else:
            print("Connection test failed")
    except Exception as e:
        logging.exception("Connection test failed")


def db_add_survey(config, search_area):
    """
    Add a survey entry to the database, so the survey can be run.
    Also returns the survey_id, in case it is to be used..
    """

    # POSTGRESQL
    try:
        conn = config.connect()
        cur = conn.cursor()
        # Add an entry into the survey table, and get the survey_id
        sql = """
				insert into survey (survey_description, search_area_id)
				select (name || ' (' || current_date || ')') as survey_description,
				search_area_id
				from search_area
				where name = %s
				returning survey_id"""
        cur.execute(sql, (search_area,))
        survey_id = cur.fetchone()[0]

        # Get and print the survey entry
        cur.execute("""select survey_id, date,
				survey_description, search_area_id
				from survey where survey_id = %s""", (survey_id,))
        (survey_id,
         date,
         survey_description,
         search_area_id) = cur.fetchone()
        conn.commit()
        cur.close()
        print("\nSurvey added:\n"
              + "\n\tsurvey_id=" + str(survey_id)
              + "\n\tdate=" + str(date)
              + "\n\tsurvey_description=" + survey_description
              + "\n\tsearch_area_id=" + str(search_area_id))
        return survey_id
    except Exception as e:
        logging.error("Failed to add survey for %s", search_area)
        raise


def db_add_search_area(config, search_area, flag):  # version of tom slee
    """
    Add a search_area to the database.
    """
    try:
        logging.info("Adding search_area to database as new search area")
        # Add the search_area to the database anyway
        conn = config.connect()
        cur = conn.cursor()
        # check if it exists
        sql = """
				select name
				from search_area
				where name = %s"""
        cur.execute(sql, (search_area,))
        if cur.fetchone() is not None:
            print("City already exists: {}".format(search_area))
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
        sql = """insert into search_area (name, abbreviation)
				values (%s, %s)"""
        cur.execute(sql, (search_area, abbreviation,))
        sql = """select
				currval('search_area_search_area_id_seq')
				"""
        cur.execute(sql, ())
        search_area_id = cur.fetchone()[0]
        # city_id = cur.lastrowid
        cur.close()
        conn.commit()
        print("Search area {} added: search_area_id = {}"
              .format(search_area, search_area_id))
        print("Before searching, update the row to add a bounding box, using SQL.")
        print(
            "I use coordinates from http://www.mapdevelopers.com/geocode_bounding_box.php.")
        print("The update statement to use is:")
        print("\n\tUPDATE search_area")
        print("\tSET bb_n_lat = ?, bb_s_lat = ?, bb_e_lng = ?, bb_w_lng = ?")
        print("\tWHERE search_area_id = {}".format(search_area_id))
        print("\nThis program does not provide a way to do this update automatically.")

    except Exception as e:
        print("Error adding search area to database")
        raise


def select_sublocalities(config, ss_id):
    return select_command(config,
                          sql_script="""SELECT distinct sublocality, locality from rooms_avg where survey_id in ( select distinct(survey_id) from survey where ss_id = %s )""",
                          params=(ss_id,),
                          initial_message="Selecting sublocalities from city",
                          failure_message="Failed to search from sublocalities")


def select_routes(config, ss_id):
    return select_command(config,
                          sql_script="""SELECT distinct route, sublocality from rooms_avg where survey_id in ( select distinct(survey_id) from survey where ss_id = %s )""",
                          params=(ss_id,),
                          initial_message="Selecting routes from sublocality",
                          failure_message="Failed to search from sublocalities")


def search_status_for_super_survey_id(config, ss_id):
    return select_command(config,
                          sql_script="""SELECT status from super_survey where ss_id = %s""",
                          params=(ss_id,),
                          initial_message="Selecting status from super survey",
                          failure_message="Failed to select status for super survey")


def create_super_survey(config, city, userId):
    try:
        ss_id = None
        logging.info("Configurando pesquisa")
        conn = config.connect()
        cur = conn.cursor()
        print("os parametros: ", city, userId if userId else None)

        sql = """INSERT into super_survey(city, user_id, date) values (%s, %s, current_date) returning ss_id"""
        cur.execute(sql, (city, userId if userId else 1))
        ss_id = cur.fetchone()[0]
        print("na 188:", ss_id)

        conn.commit()
        cur.close()

        return ss_id
    except Exception as e:
        print("o erro:", e)
        logging.error("Falha ao configurar pesquisa")
        raise
    finally:
        return ss_id


def update_super_survey_status(config, ss_id, status, logs):
    try:
        update_command(config,
                       sql_script="""
															update super_survey set all_logs = ( SELECT all_logs from super_survey where ss_id = %s) || '\n' || %s where ss_id = %s returning ss_id
														""",
                       params=(ss_id, logs, ss_id),
                       initial_message="Updating all logs of super survey {ss_id} to {status}".format(
                           ss_id=ss_id, status=status),
                       failure_message="Failed to update all logs of super survey {ss_id} to {status}".format(ss_id=ss_id, status=status))
    finally:
        return update_command(config,
                              sql_script="""
                                  update super_survey set status = %s, logs = %s where ss_id = %s returning status
                                """,
                              params=(status, logs, ss_id),
                              initial_message="Updating status of super survey {ss_id} to {status}".format(
                                  ss_id=ss_id, status=status),
                              failure_message="Failed to update status of super survey {ss_id} to {status}".format(ss_id=ss_id, status=status))


def update_survey_with_super_survey_id(config, super_survey_id, survey_id):
    update_command(config,
                   sql_script="""UPDATE survey set ss_id = %s where survey_id = %s returning ss_id""",
                   params=(super_survey_id, survey_id),
                   initial_message="Initializing update of survey with super survey id",
                   failure_message="Failed to update survey with super survey id")


def execute_search(config, platform="Airbnb", search_area_name='', start_date=None, finish_date=None, super_survey_id=None):
    # survey_id = db_add_survey(ab_config, search_area_name)
    # search_booking_rooms(ab_config, search_area_name,
    #                      start_date, finish_date, survey_id)
    # print("acabou a pesquisa!")
    # exit(0)

    try:
        _platform = "Airbnb" if platform != 'Booking' else "Booking"
        update_super_survey_status(config,
                                   super_survey_id,
                                   status=11 if (
                                       _platform == "Airbnb") else 711,
                                   logs='Realizando pesquisa por ' + search_area_name)
        # create/insert in database search area with coordinates
        bounding_box = BoundingBox.from_geopy(ab_config, search_area_name)
        bounding_box.add_search_area(ab_config, search_area_name)

        # initialize new survey
        survey_id = db_add_survey(ab_config, search_area_name)
        if (super_survey_id):
            update_survey_with_super_survey_id(
                ab_config, super_survey_id, survey_id)

        # search for the listings
        if (_platform == "Airbnb"):
            print("216")
            survey = ABSurveyByBoundingBox(ab_config, survey_id)
            print("218")
            survey.search(ab_config.FLAGS_ADD)
            print("219")
            airbnb_score_search(ab_config, search_area_name,
                                super_survey_id)
        else:
            search_booking_rooms(ab_config, search_area_name,
                                 start_date, finish_date, survey_id)

        return survey_id
    except Exception as e:
        print("o erro 240:", e)
        update_super_survey_status(config,
                                   super_survey_id,
                                   status=-11 if (_platform ==
                                                  "Airbnb") else -711,
                                   logs='Falha ao realizar pesquisa por ' + search_area_name)
        return None


def search_sublocalities(config, platform="Airbnb", search_area_name='', start_date=None, finish_date=None, super_survey_id=None):
    try:
        update_super_survey_status(config,
                                   super_survey_id,
                                   status=41 if (
                                       platform == "Airbnb") else 741,
                                   logs='Selecionando bairros de ' + search_area_name)
        sa_name = search_area_name.split(',')[0]
        city_sublocalities = select_sublocalities(config, super_survey_id)
        print(city_sublocalities)

        i = 0
        if not city_sublocalities:
            update_super_survey_status(config,
                                       super_survey_id,
                                       status=49 if (
                                           platform == "Airbnb") else 749,
                                       logs='Nenhum bairro foi identificado em ' + search_area_name + '. Pesquisa dada como concluída')
        for city in city_sublocalities:
            i = i + 1
            if (city[0] is not None):
                sublocality_name = city[0] + ', ' + city[1]
                try:
                    execute_search(config=config, platform=platform, search_area_name=sublocality_name,
                                   start_date=start_date, finish_date=finish_date, super_survey_id=super_survey_id)
                    update_super_survey_status(config,
                                               super_survey_id,
                                               status=42 if (
                                                   platform == "Airbnb") else 742,
                                               logs='Iniciando busca por bairro ' + sublocality_name + ' (' + i + '/' + str(len(city_sublocalities)) + ')')
                except Exception as e:
                    print("o erro:", e)
                    update_super_survey_status(config,
                                               super_survey_id,
                                               status=-42 if (
                                                   platform == "Airbnb") else -742,
                                               logs='Falha ao buscar por bairro ' + sublocality_name + ' (' + i + '/' + str(len(city_sublocalities)) + ')')
        update_super_survey_status(config,
                                   super_survey_id,
                                   status=43 if (
                                       platform == "Airbnb") else 743,
                                   logs='Busca por bairros de ' + search_area_name + ' concluída (' + str(len(city_sublocalities)) + '/' + str(len(city_sublocalities)) + ')')
    except Exception as e:
        print("o erro:", e)
        update_super_survey_status(config,
                                   super_survey_id,
                                   status=-41 if (platform ==
                                                  "Airbnb") else -741,
                                   logs='Falha ao buscar por bairros de ' + search_area_name)


def search_routes(config, platform="Airbnb", search_area_name='', start_date=None, finish_date=None, super_survey_id=None):
    try:
        update_super_survey_status(config,
                                   super_survey_id,
                                   status=51 if (
                                       platform == 'Airbnb') else 751,
                                   logs='Selecionando ruas de ' + search_area_name)
        sublocalities_routes = select_routes(config, super_survey_id)
        print(sublocalities_routes)

        i = 0
        if not sublocalities_routes:
            update_super_survey_status(config,
                                       super_survey_id,
                                       status=49 if (
                                           platform == "Airbnb") else 749,
                                       logs='Nenhuma rua foi identificada em ' + search_area_name + '. Pesquisa dada como concluída')
        for city in sublocalities_routes:
            i = i + 1
            if (city[0] is not None):
                sublocality_name = city[0] + ', ' + city[1]
                try:
                    execute_search(config=config, platform=platform, search_area_name=sublocality_name,
                                   start_date=start_date, finish_date=finish_date, super_survey_id=super_survey_id)
                    update_super_survey_status(config,
                                               super_survey_id,
                                               status=82 if (
                                                   platform == 'Airbnb') else 782,
                                               logs='Iniciando busca por rua ' + sublocality_name + ' (' + i + '/' + str(len(sublocalities_routes)) + ')')
                except Exception as e:
                    print("o erro:", e)
                    update_super_survey_status(config,
                                               super_survey_id,
                                               status=-
                                               82 if (
                                                   platform == 'Airbnb') else -782,
                                               logs='Falha ao buscar por rua ' + sublocality_name + ' (' + i + '/' + str(len(sublocalities_routes)) + ')')
        update_super_survey_status(config,
                                   super_survey_id,
                                   status=83 if (
                                       platform == 'Airbnb') else 783,
                                   logs='Busca por ruas de ' + search_area_name + ' concluída (' + str(len(sublocalities_routes)) + '/' + str(len(sublocalities_routes)) + ')')
    except Exception as e:
        print("o erro:", e)
        update_super_survey_status(config,
                                   super_survey_id,
                                   status=-81 if (platform ==
                                                  'Airbnb') else -781,
                                   logs='Falha ao buscar por ruas de ' + search_area_name)


def full_process(platform="Airbnb", search_area_name='', start_date=None, finish_date=None, user_id=None, super_survey_id=None, status_super_survey_id=0,
                 include_locality_search=True, include_route_search=True, columns=[], clusterization_method="kmodes", aggregation_method="avg"):
    try:
        _platform = "Airbnb" if platform != 'Booking' else "Booking"
        if ((status_super_survey_id in statusDict["PESQUISAR_CIDADE_AIRBNB"]) or
                (status_super_survey_id in statusDict["PESQUISAR_CIDADE_BOOKING"])):
            try:
                print(platform, _platform)
                print("ESTÁ EM PESQUISAR CIDADE", super_survey_id)
                execute_search(config=ab_config, platform=_platform, search_area_name=search_area_name,
                               start_date=start_date, finish_date=finish_date, super_survey_id=super_survey_id)
                update_super_survey_status(ab_config,
                                           super_survey_id,
                                           status=3 if (
                                               platform == 'Airbnb') else 73,
                                           logs='Iniciando busca por ' + search_area_name)  # identify_and_insert_locations(ab_config, _platform, survey_id) #not necessary since is inserting locations at the same time its inserting rooms
            except Exception as e:
                print("o erro: ", e)
                print(search_area_name)
                update_super_survey_status(ab_config,
                                           super_survey_id,
                                           status=-
                                           3 if (platform == 'Airbnb') else -73,
                                           logs='Falha ao iniciar busca por ' + search_area_name)
        if (((status_super_survey_id in statusDict["PESQUISAR_BAIRRO_AIRBNB"]) or
             (status_super_survey_id in statusDict["PESQUISAR_BAIRRO_BOOKING"]))
                and include_locality_search):
            try:
                search_sublocalities(ab_config, _platform, search_area_name,
                                     True, start_date, finish_date, super_survey_id)
                update_super_survey_status(ab_config,
                                           super_survey_id,
                                           status=4 if (
                                               platform == 'Airbnb') else 74,
                                           logs='Iniciando busca por bairros de ' + search_area_name)
            except Exception as e:
                print("o erro:", e)
                update_super_survey_status(ab_config,
                                           super_survey_id,
                                           status=-
                                           4 if (platform == 'Airbnb') else -74,
                                           logs='Falha ao iniciar busca por bairros de ' + search_area_name)
        if (((status_super_survey_id in statusDict["PESQUISAR_RUA_AIRBNB"]) or
             (status_super_survey_id in statusDict["PESQUISAR_RUA_BOOKING"])) or include_route_search):
            try:
                search_routes(config=ab_config, platform=_platform, search_area_name=search_area_name,
                              start_date=start_date, finish_date=finish_date, super_survey_id=super_survey_id)
                update_super_survey_status(ab_config,
                                           super_survey_id,
                                           status=5 if (
                                               platform == 'Airbnb') else 75,
                                           logs='Iniciando busca por ruas de ' + search_area_name)
            except Exception as e:
                print("o erro:", e)
                update_super_survey_status(ab_config,
                                           super_survey_id,
                                           status=-
                                           5 if (platform == 'Airbnb') else -75,
                                           logs='Falha ao iniciar busca por ruas de ' + search_area_name)
        update_super_survey_status(ab_config,
                                   super_survey_id,
                                   status=200 if ((platform == 'Airbnb') or (
                                       platform == "Booking") or (status_super_survey_id >= 7)) else 6,
                                   logs='Pesquisa por ' + search_area_name + ' finalizada')
        if platform == 'both':
            update_super_survey_status(ab_config,
                                       super_survey_id,
                                       status=7,
                                       logs='Iniciando pesquisa do Booking por ' + search_area_name)
            return full_process(config=ab_config, platform="Booking", search_area_name=search_area_name, start_date=start_date, finish_date=finish_date, user_id=user_id, status_super_survey_id=status_super_survey_id * 1000, super_survey_id=super_survey_id)
    except Exception as e:
        print("o erro:", e)
        update_super_survey_status(config,
                                   super_survey_id,
                                   status=6 if (platform == 'Airbnb') else 76,
                                   logs='Falha ao pesquisar por ' + search_area_name)
        return super_survey_id


def initialize_search(config=ab_config, platform="Airbnb", search_area_name='', start_date=None, finish_date=None, user_id=None, super_survey_id=None, status_super_survey_id=0,
                      include_locality_search=True, include_route_search=True, columns=[], clusterization_method="kmodes", aggregation_method="avg"):
    try:
        # status 0, ainda n fez nada
        if (super_survey_id is None):  # super survey previously in progress
            try:
                super_survey_id = create_super_survey(
                    ab_config, search_area_name, user_id)
                if (super_survey_id):
                    print("2")
                    save_config(ab_config, platform, search_area_name,
                                start_date, finish_date, user_id, super_survey_id, status_super_survey_id,
                                include_locality_search, include_route_search, columns,
                                clusterization_method, aggregation_method)
                    print("3", super_survey_id)
                    update_super_survey_status(ab_config,
                                               super_survey_id,
                                               status=1,
                                               logs='Configuração concluída')
                    print("346")
                    return super_survey_id
            except Exception as e:
                print("o erro na 419:", e)
                update_super_survey_status(ab_config,
                                           super_survey_id,
                                           status=-1,
                                           logs='Falha ao configurar pesquisa')
        else:
            try:
                print("3!")
                status_super_survey_id = search_status_for_super_survey_id(
                    ab_config, super_survey_id)
                print("4!")
                update_super_survey_status(ab_config,
                                           super_survey_id,
                                           status=status_super_survey_id,
                                           logs='Continuando pesquisa...')
                print("5!")
            except Exception as e:
                print("o erro:", e)
                update_super_survey_status(ab_config,
                                           super_survey_id,
                                           status=-2,
                                           logs='Falha ao reiniciar pesquisa')

    except Exception as e:
        print("o erro:", e)
        update_super_survey_status(config,
                                   super_survey_id,
                                   status=-6 if (platform ==
                                                 'Airbnb') else -76,
                                   logs='Falha ao pesquisar por ' + search_area_name)
        return super_survey_id


def save_config(config, platform="Airbnb", search_area_name='', start_date=None, finish_date=None, user_id=None, super_survey_id=None, status_super_survey_id=0,
                include_locality_search=True, include_route_search=True, columns=[], clusterization_method="kmodes", aggregation_method="avg"):
    insert_command(config,
                   """INSERT INTO super_survey_config(
																platform,
																search_area_name,
																start_date,
																finish_date,
																user_id,
																ss_id,
																include_locality_search,
																include_route_search,
																data_columns,
																clusterization_method,
																aggregation_method
														)
												values(%s, %s, %s, %s, %s,%s, %s,%s, %s,%s, %s) returning config_id""",
                   (platform, search_area_name,
                    start_date, finish_date, user_id, super_survey_id,
                    include_locality_search, include_route_search, columns,
                    clusterization_method, aggregation_method),
                   "Salvando configurações da pesquisa...",
                   "Falha ao salvar configurações da pesquisa")


def parse_args():
    """
    Read and parse command-line arguments
    """
    parser = argparse.ArgumentParser(
        description='Manage a database of Airbnb listings.',
        usage='%(prog)s [options]')
    parser.add_argument("-v", "--verbose",
                        action="store_true", default=False,
                        help="""write verbose (debug) output to the log file""")
    parser.add_argument("-c", "--config_file",
                        metavar="config_file", action="store", default=None,
                        help="""explicitly set configuration file, instead of
												using the default <username>.config""")
    parser.add_argument('-u', '--user_id',
                        metavar='user_id', type=int,
                        help="""user id to request a survey""")
    parser.add_argument('-css', '--continue_super_survey',
                        metavar='super_survey_id', type=int,
                        help="""continue super survey by route""")

    # Only one argument!
    group = parser.add_mutually_exclusive_group()
    group.add_argument('-asa', '--addsearcharea',
                       metavar='search_area', action='store', default=False,
                       help="""add a search area to the database. A search area
											 is typically a city, but may be a bigger region.""")
    group.add_argument('-dbp', '--dbping',
                       action='store_true', default=False,
                       help='Test the database connection')
    group.add_argument('-f', '--fill', nargs='?',
                       metavar='survey_id', type=int, const=0,
                       help='fill details for rooms collected with -s')
    group.add_argument('-ls', '--listsurveys',
                       action='store_true', default=False,
                       help='list the surveys in the database')
    group.add_argument('-sb', '--search',
                       metavar='survey_id', type=int,
                       help="""search for rooms using survey survey_id,
											 by bounding box
											 """)
    group.add_argument('-sbs', '--search_sublocalities',
                       metavar='city_name', type=str,
                       help="""bounding box search from sublocalities""")
    group.add_argument('-sbr', '--search_routes',
                       metavar='city_name', type=str,
                       help="""bounding box search from routes""")
    group.add_argument('-fs', '--full_survey',
                       metavar='full survey area', type=str,
                       help="""make a full survey ininterrumptly""")
    parser.add_argument('-pt', '--platform',
                        metavar='platform search', type=str,
                        help="""platform to search""")
    group.add_argument('-V', '--version',
                       action='version',
                       version='%(prog)s, version ' +
                       str(SCRIPT_VERSION_NUMBER))
    group.add_argument('-?', action='help')

    args = parser.parse_args()
    return (parser, args)


def main():
    """
    Main entry point for the program.
    """
    (parser, args) = parse_args()
    logging.basicConfig(
        format='%(levelname)-8s%(message)s', level=logging.INFO)

    try:
        if args.addsearcharea:
            bounding_box = BoundingBox.from_geopy(
                ab_config, args.addsearcharea)
            bounding_box.add_search_area(ab_config, args.addsearcharea)
            # db_add_search_area(ab_config, args.addsearcharea, ab_config.FLAGS_ADD) # tom slee version
        elif args.dbping:
            db_ping(ab_config)
        elif args.search_sublocalities:
            search_sublocalities(
                ab_config, args.search_sublocalities)
        elif args.search_routes:
            search_routes(ab_config, args.search_routes)
        elif args.full_survey and args.platform:
            print(args.full_survey, args.platform)
            full_process(platform=args.platform, search_area_name=args.full_survey,
                         user_id=args.user_id, super_survey_id=args.continue_super_survey)
        else:
            parser.print_help()
    except (SystemExit, KeyboardInterrupt):
        sys.exit()
    except Exception as e:
        print("o erro:", e)
        logging.exception("Top level exception handler: quitting.")
        sys.exit(0)


if __name__ == "__main__":
    main()
