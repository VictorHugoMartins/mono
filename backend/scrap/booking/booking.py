import logging
import argparse
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import selenium
import psycopg2
from scrap.geocoding import BoundingBox
import datetime as dt

from scrap.airbnb.airbnb import db_add_survey
from scrap.geocoding import reverse_geocode_coordinates_and_insert
from config.general_config import ABConfig
from utils.functions import prepare_driver

DOMAIN = 'https://www.booking.com'
logger = logging.getLogger()


class BListing():
    """
    # BListing represents an Airbnb room_id, as captured at a moment in time.
    # room_id, survey_id is the primary key.
    """

    def __init__(self, config, driver, url, survey_id, checkin_date, checkout_date):
        self.config = config

        self.room_id = None
        self.room_name = None
        self.accommodates = None
        self.price = None
        self.bedtype = None
        self.latitude = None
        self.longitude = None
        self.avg_rating = None
        self.comodities = None
        self.hotel_name = None
        self.localized_address = None
        self.property_type = None
        self.reviews = None
        self.survey_id = survey_id
        self.checkin_date = checkin_date
        self.checkout_date = checkout_date
        self.hotel_id = None

        self.start_date = dt.date.today() + dt.timedelta(days=15)
        self.finish_date = dt.date.today() + dt.timedelta(days=16)
        self.location_id = None

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
                    if (self.config.FLAGS_INSERT_IN_LOCATION):
                        self.location_id = reverse_geocode_coordinates_and_insert(
                            self.config, self.latitude, self.longitude)
                    self.__insert()
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

    def __insert(self):
        """ Insert a room into the database. Raise an error if it fails """
        try:
            logger.debug("Values: ")
            logger.debug("\troom: {}".format(self.room_id))
            conn = self.config.connect()
            cur = conn.cursor()
            sql = """
				insert into booking_room (
					room_id, room_name, hotel_name, hotel_id, address, comodities,
					avg_rating, property_type, bed_type, accommodates,
					price, latitude, longitude, reviews, survey_id,
					checkin_date, checkout_date, location_id
					)
				values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
            insert_args = (
                self.room_id, self.hotel_name, self.room_name, self.hotel_id, self.localized_address, self.comodities,
                self.avg_rating, self.property_type, self.bedtype, self.accomodates,
                self.price, self.latitude, self.longitude, self.reviews, self.survey_id, self.checkin_date, self.checkout_date,
                self.location_id
            )

            cur.execute(sql, insert_args)
            cur.close()
            conn.commit()
            logger.debug("Room " + str(self.room_name) + ": inserted")
            logger.debug("(lat, long) = (%s, %s)".format(
                lat=self.latitude, lng=self.longitude))
        except psycopg2.IntegrityError:
            logger.info("Room " + str(self.room_name) + ": insert failed")
            conn.rollback()
            cur.close()
            raise
        except:
            conn.rollback()
            raise

    def find_room_id_and_name(self, row):
        room_name = row.find_element(
            By.CLASS_NAME, 'hprt-roomtype-link')
        self.room_name = room_name.text

        self.room_id = room_name.get_attribute("data-room-id")

    def find_hotel_name(self, driver):
        try:
            element = driver.find_element(By.CSS_SELECTOR, '.pp-header__title')
            self.hotel_name = element.text
        except selenium.common.exceptions.NoSuchElementException:
            raise

    def find_localized_address(self, driver):
        try:
            element = driver.find_element(
                By.CSS_SELECTOR, '.js-hp_address_subtitle')
            self.localized_address = element.text
        except selenium.common.exceptions.NoSuchElementException:
            raise

    def find_accommodates(self, row):
        try:
            accommodates = row.find_elements(
                By.XPATH, "//td[2]/div/div/span[2]")
            print(len(accommodates))
            self.accommodates = len(accommodates) if accommodates else None
            print("accommodates:", self.accommodates)
        except:
            raise

    def find_bed_type(self, row):
        bed_type = row.find_element(
            By.CSS_SELECTOR, '.hprt-roomtype-bed')
        self.bedtype = bed_type.text
        # print("bedtype:", self.bedtype)
        #

    def find_price(self, row):
        # preco
        price = row.find_element(
            By.CSS_SELECTOR, '.bui-price-display__value')
        self.price = float(price.text.split('R$ ')[1])
        # print("preco:", self.price)

    def find_qtd_rooms(self, row):
        qtd_rooms = 1
        qtd_elem = row.find_elements(
            By.XPATH, '//td[5]/div/select/option')

        # print("a quantidade de options: ", len(qtd_elem))

        if (len(qtd_elem) > 2):
            # print(qtd_elem[len(qtd_elem)-1].text)
            # print(qtd_elem[len(qtd_elem)-1].get_attribute("value"))
            try:
                qtd_rooms = int(
                    qtd_elem[len(qtd_elem)-1].get_attribute("value"))
            except:
                qtd_rooms = 1

        return qtd_rooms

    def find_latlng(self, driver):  # ok
        try:
            element = driver.find_element(By.ID, 'hotel_header')
            coordinates = element.get_attribute('data-atlas-latlng').split(',')
            self.latitude = coordinates[0]
            self.longitude = coordinates[1]
        except selenium.common.exceptions.NoSuchElementException:
            raise

    def find_hotel_id(self, url):
        name = url.split('www.booking.com/hotel/br/')[1]
        name = name.split('.pt-br')[0]
        print(name)
        self.hotel_id = name

    def find_property_type(self, driver):
        try:
            element = driver.find_element(
                By.CSS_SELECTOR, 'a.bui_breadcrumb__link_masked')
            print(element.text)
            if (element.text):
                print(element.text.split('(')[1].split(')')[0])
                x = element.text.split('(')[1].split(')')[0]
                self.property_type = x
        except selenium.common.exceptions.NoSuchElementException:
            raise

    def find_overall_classification(self, driver):
        try:
            element = driver.find_element(
                By.CSS_SELECTOR, 'div.a3b8729ab1.d86cee9b25')
            if ',' in element.text:
                self.avg_rating = float(element.text.replace(',', '.'))
            else:
                if len(element.text) > 0:
                    self.avg_rating = float(element.text)
        except selenium.common.exceptions.NoSuchElementException:
            raise
        except:
            raise

    def find_principal_comodities(self, driver):
        try:
            element = driver.find_elements(
                By.CSS_SELECTOR, 'div.a815ec762e.ab06168e66')
            comodities = []
            for comodity in element:
                comodities.append(comodity.text)

            self.comodities = comodities
        except selenium.common.exceptions.NoSuchElementException:
            raise

    def find_reviews_quantity(self, driver):
        try:
            element = driver.find_element(By.XPATH, '//*[@rel="reviews"]')
            if element.text is not None:
                r = element.text.split(
                    'Avaliações de hóspedes (')[1].split(')')[0]
                self.reviews = float(r)
        except selenium.common.exceptions.NoSuchElementException:
            raise
        except:
            raise

    def find_room_informations(self, driver):
        try:
            table_rows = driver.find_elements(
                By.XPATH, "//*[@id='hprt-table']/tbody/tr")
            print(len(table_rows), " linhas")
            for row in table_rows:
                try:
                    self.find_room_id_and_name(row)
                    self.find_bed_type(row)
                except selenium.common.exceptions.NoSuchElementException:
                    pass

                self.find_accommodates(row)
                self.find_price(row)
                qtd_rooms = self.find_qtd_rooms(row)

                if (qtd_rooms > 2):
                    for i in range(qtd_rooms):
                        print("inserindo vez ", i+1)
                        self.room_id = self.room_id.join(str(i))

                    exit(0)
                else:
                    self.room_id = self.room_id.join('1')
                    print(self.room_id)

            exit(0)

            # corrigir accommodates (ok)
            # decidir entre ter 2 apis, configurar 1 so
            # especificar no texto como as acomodacoes sao inseridas
        except selenium.common.exceptions.NoSuchElementException:
            raise


def return_next_page(city, checkin_date, checkout_date, offset):
    try:
        url = "https://www.booking.com/searchresults.pt-br.html?ss={}&ssne={}&ssne_untouched={}&checkin={}&checkout={}&offset={}".format(
            city, city, city, checkin_date, checkout_date, offset)
        return prepare_driver(url)
    except selenium.common.exceptions.ElementClickInterceptedException:
        print("n foi pra proxima pagina")


def find_properties_in_results_list(driver):
    property_cards = driver.find_elements(
        By.XPATH, '//*[@data-testid="property-card"]//*[@data-testid="title-link"]')
    urls = []
    for property_card in property_cards:
        urls.append(property_card.get_attribute("href"))

    return urls


def scrap_page_data(config, driver, url, survey_id, checkin_date, checkout_date):
    hotel_page = prepare_driver(url)

    listing = BListing(config, driver, url,
                       survey_id, checkin_date, checkout_date)

    listing.find_hotel_id(url)
    listing.find_latlng(hotel_page)
    listing.find_principal_comodities(hotel_page)
    listing.find_hotel_name(hotel_page)
    listing.find_localized_address(hotel_page)
    listing.find_reviews_quantity(hotel_page)
    listing.find_overall_classification(hotel_page)
    # print("vem aqui")
    listing.find_property_type(hotel_page)

    listing.find_room_informations(
        hotel_page)  # needs to be the last call

    hotel_page.quit()


def search_booking_rooms(config=ABConfig(), area='', start_date=None, finish_date=None, survey_id=None):
    print("Searching in Booking")
    city = area.split(',')[0]

    checkin_date = start_date
    if checkin_date is None:
        checkin_date = dt.date.today() + dt.timedelta(days=15)

    checkout_date = finish_date
    if checkout_date is None:
        checkout_date = dt.date.today() + dt.timedelta(days=16)

    url = "https://www.booking.com/searchresults.pt-br.html?ss={}&ssne={}&ssne_untouched={}&checkin={}&checkout={}".format(
        city, city, city, checkin_date, checkout_date)
    driver = prepare_driver(url)
    print("aqui")

    # FIND ALL PAGES
    for i in range(config.ATTEMPTS_TO_FIND_PAGE):
        offset = 0
        try:
            logger.debug("Attempt " + str(i+1) + " to find page")

            urls = find_properties_in_results_list(driver)
            print("as urls: ", urls)

            if (len(urls) == 0):
                break
            for url in urls:
                scrap_page_data(config, driver, url,
                                survey_id, checkin_date, checkout_date)

            offset = offset + 25

            driver = return_next_page(
                city, checkin_date, checkout_date, offset)
            WebDriverWait(driver, 10).until(EC.presence_of_element_located(
                (By.ID, 'bodyconstraint-inner')))
            print("aguardou")
        except selenium.common.exceptions.TimeoutException:
            print("hmm")
            continue
        finally:
            driver.quit()

    driver.quit()


def parse_args():
    """
    Read and parse command-line arguments
    """
    parser = argparse.ArgumentParser(
        description='Manage a database of Booking listings.',
        usage='%(prog)s [options]')
    parser.add_argument("-v", "--verbose",
                        action="store_true", default=False,
                        help="""write verbose (debug) output to the log file""")
    parser.add_argument("-c", "--config_file",
                        metavar="config_file", action="store", default=None,
                        help="""explicitly set configuration file, instead of
						using the default <username>.config""")
    parser.add_argument('-sc', '--city',
                        metavar='city_name', type=str,
                        help="""search by a city
						 """)
    parser.add_argument('-sd', '--start_date',
                        metavar='start_date', type=str,
                        help="""start date of travel
						 """)
    parser.add_argument('-fd', '--finish_date',
                        metavar='finish_date', type=str,
                        help="""finish date of travel
						 """)

    # Only one argument!
    group = parser.add_mutually_exclusive_group()
    group.add_argument('-ur', '--update_routes',
                       metavar='city_name', type=str,
                       help="""update routes from rooms""")  # by victor

    args = parser.parse_args()
    return (parser, args)


def main():
    (parser, args) = parse_args()
    logging.basicConfig(format='%(levelname)-8s%(message)s')
    config = ABConfig(args)

    try:
        if args.city:
            # create/insert in database search area with coordinates
            bounding_box = BoundingBox.from_geopy(config, args.city)
            bounding_box.add_search_area(config, args.city)

            # initialize new survey
            survey_id = db_add_survey(config, args.city)

            search_booking_rooms(config, args.city, args.start_date, args.finish_date,
                                 survey_id)
    except (SystemExit, KeyboardInterrupt):
        logger.debug("Interrupted execution")
        exit(0)
    except Exception:
        logging.exception("Top level exception handler: quitting.")
        exit(0)


if __name__ == "__main__":
    main()
