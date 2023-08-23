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
from config.general_config import ABConfig
import sys
import logging
import psycopg2
from utils.sql_commands import select_command, update_command, insert_command

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
        try:
            rowcount = -1

            '''if insert_replace_flag == self.config.FLAGS_INSERT_REPLACE:
					rowcount = self.__update()'''
            if (rowcount == 0 or
                    insert_replace_flag == self.config.FLAGS_INSERT_NO_REPLACE):
                try:
                    # self.get_address()
                    self.insert()
                    return True
                except psycopg2.IntegrityError:
                    logger.debug("Room " + str(self.room_name) +
                                 ": already collected")
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
            location_id = None
            already_exists = select_command(sql_script="""SELECT location_id from location
                                            where route = %s and sublocality = %s
                                            and locality = %s and level1 = %s and level2 = %s
                                            and country = %s limit 1""",
                                            params=(
                                                self.route, self.sublocality, self.locality,
                                                self.level1, self.level2, self.country
                                            ),
                                            initial_message="Verificando se Localização já existe...",
                                            failure_message="Falha ao verificar se Localização já existe")
            if already_exists:
                location_id = already_exists[0][0]
            else:
                location_id = insert_command(sql_script="""
                  INSERT INTO LOCATION(route, sublocality, locality, level1, level2, country)
                    values (%s, %s, %s, %s, %s, %s) returning location_id
                  """,
                                             params=(
                                                 (
                                                     self.route, self.sublocality, self.locality, self.level1, self.level2, self.country
                                                 )),
                                             initial_message="Inserindo Localização...",
                                             failure_message="Falha ao inserir Localização {r}!"
                                             )

        except Exception as e:
            logger.error(e)
            raise
        finally:
            return location_id

    @ classmethod
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
        if ((self.lat_round is not None) and (self.lng_round is not None)):
            try:
                address = reverse(self.lat_round + ", " + self.lng_round)
            except geopy.exc.GeocoderUnavailable:
                print("Failed to reverse geocode")
                raise
        else:
            return

        if address is not None:
            try:
                if (address.raw['address']['road']):
                    self.route = address.raw['address']['road']
            except KeyError:
                pass

            try:
                if (address.raw['address']['neighbourhood']):
                    self.neighbourhood = address.raw['address']['neighbourhood']
            except KeyError:
                pass

            try:
                if (address.raw['address']['suburb']):
                    self.sublocality = address.raw['address']['suburb']
            except KeyError:
                pass

            try:
                if (address.raw['address']['town']):
                    self.locality = address.raw['address']['town']
            except KeyError:
                pass

            try:
                if (address.raw['address']['municipality']):
                    self.level2 = address.raw['address']['municipality']
            except KeyError:
                pass

            try:
                if (address.raw['address']['state']):
                    self.level1 = address.raw['address']['state']
            except KeyError:
                pass

            try:
                if (address.raw['address']['postcode']):
                    self.postcode = address.raw['address']['postcode']
            except KeyError:
                pass

            try:
                if (address.raw['address']['country']):
                    self.country = address.raw['address']['country']
            except KeyError:
                pass

    def insert_in_search_area(self, config):
        # insert country
        bounding_box = BoundingBox.from_geopy(config, self.country)
        bounding_box.add_search_area(config, self.country)

        # insert country
        bounding_box = BoundingBox.from_geopy(
            config, self.level1 + ', ' + self.country)
        bounding_box.add_search_area(config, self.level1 + ', ' + self.country)

        # insert country
        bounding_box = BoundingBox.from_geopy(
            config, self.level2 + ', ' + self.level1)
        bounding_box.add_search_area(config, self.level2 + ', ' + self.level1)

        # insert country
        bounding_box = BoundingBox.from_geopy(
            config, self.sublocality + ', ' + self.level2)
        bounding_box.add_search_area(
            config, self.sublocality + ', ' + self.level2)


class BoundingBox():
    """
    Get max and min lat and long for a search area
    """

    def __init__(self, bounding_box):
        (self.bb_s_lat,
         self.bb_n_lat,
         self.bb_w_lng,
         self.bb_e_lng) = bounding_box

    @ classmethod
    def from_db(cls, config, search_area):
        """
        Get a bounding box from the database by reading the search_area.name
        """
        try:
            return select_command(config=config,
                                  sql_script="SELECT bb_s_lat, bb_n_lat, bb_w_lng, bb_e_lng FROM search_area WHERE name = %s",
                                  params=((search_area,)),
                                  initial_message="Selecionando coordenadas...",
                                  failure_message="Falha ao selecionar coordenadas")
        except:
            logger.exception("Exception in BoundingBox_from_db: exiting")
            sys.exit()

    @ classmethod
    def from_geopy(cls, config, search_area):
        """
        Get a bounding box from Google
        """

        for i in range(0, 10):
            try:
                # geolocator = Nominatim(user_agent="specify_your_app_name_here")
                geolocator = Nominatim(user_agent="airbnb_and_booking_scrap")
                location = geolocator.geocode((search_area))
                bounds = location.raw['boundingbox']

                print(location.raw)

                # [n_lat, e_lng, s_lat, w_lng]

                print(bounds)
                bounding_box = (bounds[1],
                                bounds[0],
                                bounds[3],
                                bounds[2]
                                )

                print(bounding_box)

                return cls(bounding_box)
            except geopy.exc.GeocoderUnavailable:
                continue
            except:
                logger.exception(
                    "Exception in BoundingBox_from_geopy: exiting")
                continue

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
                    logger.debug("Room " + str(room_id) +
                                 " updated. New sublocality: " + name)
        except:
            raise
        finally:
            try:
                cur.close()
            except:
                pass

    @ classmethod
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
            # logging.info("Adding search_area to database as new search area")
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
        finally:
            try:
                cur.close()
            except:
                pass


def reverse_geocode_coordinates_and_insert(config, lat, lng):
    location = Location(config, str(lat), str(lng))
    location.reverse_geocode(config)
    already_exists = select_command(sql_script="""SELECT location_id from location
                                            where route = %s and sublocality = %s
                                            and locality = %s and level1 = %s and level2 = %s
                                            and country = %s limit 1""",
                                    params=(
                                        location.route, location.sublocality, location.locality,
                                        location.level1, location.level2, location.country
                                    ),
                                    initial_message="Verificando se Localização já existe...",
                                    failure_message="Falha ao verificar se Localização já existe")
    if len(already_exists) > 0:
        return already_exists[0][0]
    else:
        return location.insert()


def reverse_geocode_coordinates_and_update(config, lat, lng, room_id, table):
    location_id = reverse_geocode_coordinates_and_insert(config, lat, lng)

    return update_command(sql_script="""UPDATE {p} set location_id = %s where room_id = %s and location_id is null returning location_id""".format(p=table),
                          params=(
                              (location_id, room_id)),
                          initial_message="Atualizando localização da Acomodação {a}...".format(
                              a=room_id),
                          failure_message="Falha ao atualizar localização da Acomodação {a}...".format(
                              a=room_id)
                          )


def get_coordinates_list(table="room"):
    return select_command(sql_script="""SELECT DISTINCT latitude, longitude, room_id from {t} where location_id is null limit 100""".format(
        t=table),
        params=(()),
        initial_message="Selecting coordinates list from " + table,
        failure_message="Failed to search coordinates list")


def identify_and_update_locations(platform):
    table = 'room' if platform == 'Airbnb' else 'booking_room'
    coordinates_list = get_coordinates_list(table)
    if ((coordinates_list is not None) and (len(coordinates_list) > 0)):
        for coordinate in coordinates_list:
            try:
                lat = coordinate[0]
                lng = coordinate[1]
                room_id = coordinate[2]
                if (lat is not None) and (lng is not None):
                    reverse_geocode_coordinates_and_update(
                        ABConfig(), lat, lng, room_id, table)
            except:
                pass


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
                        help="""search_area""")  # para implementar
    parser.add_argument("--lat",
                        metavar="lat", type=float,
                        help="""lat""")
    parser.add_argument("--lng",
                        metavar="lng", type=float,
                        help="""lng""")
    parser.add_argument("--bb_n_lat",
                        metavar="bb_n_lat", type=float,
                        help="""bb_n_lat""")  # para implementar
    parser.add_argument("--bb_s_lat",
                        metavar="bb_s_lat", type=float,
                        help="""bb_s_lat""")  # para implementar
    parser.add_argument("--bb_e_lng",
                        metavar="bb_e_lng", type=float,
                        help="""bb_e_lng""")  # para implementar
    parser.add_argument("--bb_w_lng",
                        metavar="bb_w_lng", type=float,
                        help="""bb_w_lng""")  # para implementar
    parser.add_argument("--count",
                        metavar="count", type=int,
                        help="""number_of_lookups""")  # para implementar
    parser.add_argument("--update",
                        metavar="update", type=int,
                        help="""update locations from search area""")
    parser.add_argument("--insert",
                        metavar="insert", type=str,
                        help="""insert search area""")
    args = parser.parse_args()

    if args.insert:
        bounding_box = BoundingBox.from_geopy(config, args.insert)
        logger.info("Bounding box for %s from Google = (%s, %s, %s, %s)",
                    args.insert,
                    bounding_box.bb_s_lat, bounding_box.bb_n_lat,
                    bounding_box.bb_w_lng, bounding_box.bb_e_lng)
        bounding_box.add_search_area(config, args.insert)


if __name__ == "__main__":
    main()
