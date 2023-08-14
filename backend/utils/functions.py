import os
import time
import random
import logging
import string
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from geopy import distance
from utils.general_dict import get_all_rooms_by_ss_id
from utils.file_manager import export_datatable
from config.general_config import ABConfig


ab_config = ABConfig()

exclusive_airbnb_columns = ['host_id', 'name', 'minstay', 'bathroom',
                            'avg_rating', 'extra_host_languages', 'is_superhost', 'room_type']
exclusive_booking_columns = ['start_date', 'finish_date']

logging = logging.getLogger()


def is_inside(lat_center, lng_center, lat_test, lng_test, verbose=False):
    center_point = [{'lat': lat_center, 'lng': lng_center}]
    test_point = [{'lat': lat_test, 'lng': lng_test}]

    for radius in range(50):
        # (-7.7940023, 110.3656535)
        center_point_tuple = tuple(center_point[0].values())
        # (-7.79457, 110.36563)
        test_point_tuple = tuple(test_point[0].values())

        dis = distance.distance(center_point_tuple, test_point_tuple).km

        if dis <= radius:
            if (verbose == True):
                print("{} point is inside the {} km radius from {} coordinate".
                      format(test_point_tuple, radius/1000, center_point_tuple))
            return True
    return False


def check_and_create_file(filename):
    print(os.curdir)
    try:
        if not os.path.isdir(filename):
            print("28")  # if directory don't exists, create
            os.mkdir(filename)
            print("errooo!!")
    except Exception as e:
        print("o erro: ", e)
    finally:
        print("existe o arquivo?", os.path.isdir(filename))
        exit(0)


def select_command(config, sql_script, params, initial_message, failure_message):
    try:
        print(sql_script, (params))
        logging.info(initial_message)
        conn = config.connect()
        cur = conn.cursor()

        cur.execute(sql_script, (params))

        return cur.fetchall()
    except Exception:
        logging.error(failure_message)
        return None
    finally:
        print("vai fechar a conexão")
        cur.close()
        print("fechou")


def delete_command(config, sql_script, params, initial_message, failure_message):
    try:
        rowcount = -1
        logging.info(initial_message)
        conn = config.connect()
        cur = conn.cursor()

        cur.execute(sql_script, params)
        rowcount = cur.rowcount
        conn.commit()

        return rowcount > -1
    except Exception:
        logging.error(failure_message)
        raise
    finally:
        print("vai fechar a conexão")
        cur.close()
        print("fechou")
        return rowcount > -1


def update_command(config, sql_script, params, initial_message, failure_message):
    try:
        id = None
        logging.info(initial_message)
        conn = config.connect()
        cur = conn.cursor()

        cur.execute(sql_script, params)
        conn.commit()

        id = cur.fetchone()[0]

        return id
    except Exception:
        logging.error(failure_message)
        raise
    finally:
        print("vai fechar a conexão")
        cur.close()
        print("fechou")
        return id


def insert_command(config, sql_script, params, initial_message, failure_message):
    try:
        id = None
        logging.info(initial_message)
        conn = config.connect()
        cur = conn.cursor()

        sql = sql_script
        cur.execute(sql, params)
        conn.commit()

        id = cur.fetchone()[0]
        cur.close()

        return id
    except Exception as e:
        print(e)
        logging.error(failure_message)
        conn.rollback()
        return None


def prepare_driver(url):
    '''Returns a Firefox Webdriver.'''
    print("preparando driver")
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")

    prefs = {"profile.managed_default_content_settings.images": 2}
    chrome_options.headless = True

    chrome_options.add_experimental_option("prefs", prefs)
    try:
        driver = webdriver.Chrome(service=Service(
          ChromeDriverManager().install()), options=chrome_options)
    except Exception as e:
        print("deu ruim!!!", e)
    print("instanciou o driver")

    return driver
    try:
        driver.get(url)
    except Exception as e:
        print("deu ruim no get!!!", e)
    print("fez o get")
    return driver


def buildChartObjectFromValueCounts(obj):
    result = []
    for key in obj.keys():
        result.append({"label": key, "value": obj[key]})
    return result


def removeLastWordOfString(word, str):
    aux = str.split()
    if (aux[-1] == word):
        return ''.join(str).rsplit(' ', 1)[0]
    else:
        return ''.join(str)


def buildFilterQuery(data, platform):
    exclusive_airbnb_columns = ['host_id', 'name', 'minstay', 'bathroom',
                                'avg_rating', 'extra_host_languages', 'is_superhost', 'room_type']
    exclusive_booking_columns = ['start_date', 'finish_date']
    ignore_columns = ['cluster_parameters', 'n_clusters', 'threshold',
                      'branching_factor', 'init', 'n_init', 'min_samples', 'eps']

    query = 'WHERE'
    params = []
    for key in data.keys():
        print(key, key in exclusive_airbnb_columns)
        if (key in ignore_columns):
            continue
        if ((key == 'agg_method') or (key == 'clusterization_method')):
            continue
        if ((platform == 'Airbnb') and (key in exclusive_booking_columns)):
            continue
        elif ((platform == 'Booking') and (key in exclusive_airbnb_columns)):
            continue
        elif ((key == 'platform') and (data[key] == 'both')):
            data[key] = ['Airbnb', 'Booking']

        if (key != 'ss_id'):
            if (type(data[key]) == list):
                values = data[key]
                if (len(values) > 1):
                    range_list = []
                    for k in range(0, len(values)):
                        range_list.append(k)
                    for i, element in zip(range_list, values):
                        if (i == 0):
                            query = ''.join(
                                query + " ( {column} = %s or".format(column=key))
                            if (i == (len(values)-1)):
                                query = removeLastWordOfString('or', query)
                                query = ''.join(query + ")".format(column=key))
                        elif (i == (len(values)-1)):
                            query = ''.join(
                                query + " {column} = %s ) and".format(column=key))
                        else:
                            query = ''.join(
                                query + " {column} = %s  ".format(column=key))
                        params.append(values[i])
                elif (len(values) == 1):
                    query = ''.join(
                        query + " {column} = %s and".format(column=key, value=data[key][0]))
                    params.append(data[key][0])
            else:
                query = removeLastWordOfString('or', query)
                query = ''.join(
                    query + " {column} = %s and".format(column=key, value=data[key]))
                params.append(data[key])

    query = removeLastWordOfString('and', query)
    query = removeLastWordOfString('or', query)
    if (query != 'WHERE'):
        return (query, tuple(params))
    return ('', ())


def asSelectObject(array):
    result = []
    if array:
        for item in array:
            result.append({"label": item[0] if item[0]
                          else "Indefinido", "value": item[0]})
    return result


def build_options(column, values, ss_id):
    if (values == ["min", "max"]):
        result = select_command(ab_config,
                                sql_script="""WITH consulta AS ( {consulta}) 
							SELECT min({column}), max({column}) FROM consulta
							""".format(consulta=get_all_rooms_by_ss_id(ss_id), column=column),
            params=(()),
            initial_message="Selecionando valores mínimo e máximo para " +
            str(column),
            failure_message="Falha ao selecionar valores mínimo e máximo para " + str(column))
        if result:
            return (result[0][0], result[0][1])
        else:
            return (0, 0)
    elif (values == ["options"]):
        return asSelectObject(select_command(ab_config,
                                             sql_script="""with consulta as ( {consulta} ) 
							select distinct({column}) from consulta
							order by {column}
							""".format(consulta=get_all_rooms_by_ss_id(ss_id), column=column),
            params=(()),
            initial_message="Selecionando valores mínimo e máximo para " +
            str(column),
            failure_message="Falha ao selecionar valores mínimo e máximo para " + str(column)))


def get_random_string(length):
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    print("Random string of length", length, "is:", result_str)
    return result_str


def buildGraphObjectFromSqlResult(data):
    result = []
    for item in data:
        result.append({"label": item[0], "value": item[1]})
    return [{"values": result}]


def get_rooms(data, columns, agg_method):
    print("veio nesse aqui")
    (query, params) = buildFilterQuery(data, 'both')
    try:
        columns = columns.replace('{', '').replace('}', '')
        if (len(columns) == 1):
            columns = columns[0].split(' ')
        print("as colunas: ", columns)
    except:
        columns = ', '.join(columns)
    print("passou desse", columns)

    rooms = export_datatable(ab_config, """
										WITH consulta AS ( {consulta} )
											SELECT room_id, platform, {columns} FROM consulta {query}
											""".format(consulta=get_all_rooms_by_ss_id(data["ss_id"], agg_method=agg_method), columns=columns, query=query), params, "Airbnb", True, True)
    return rooms


def xNotIn(exclusive_list, other_list):
    result = []
    other_list = other_list.split(', ')
    for x in other_list:
        if x not in exclusive_airbnb_columns:
            result.append(x)
    return ', '.join(result)


# import logging
# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.chrome.service import Service
# from webdriver_manager.chrome import ChromeDriverManager
# import selenium
# import datetime as dt

# DOMAIN = 'https://www.booking.com'
# logger = logging.getLogger()

# def prepare_driver(url):
#     '''Returns a Firefox Webdriver.'''
#     print("preparando driver")
#     chrome_options = webdriver.ChromeOptions()
#     chrome_options.add_argument("--headless")
#     chrome_options.add_argument("--no-sandbox")
#     chrome_options.add_argument("--disable-dev-shm-usage")

#     prefs = {"profile.managed_default_content_settings.images":2}
#     chrome_options.headless = True


#     chrome_options.add_experimental_option("prefs", prefs)
#     driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)


#     print("instanciou o driver")
#     driver.get(url)
#     print("fez o get")
#     time.sleep(3)
#     return driver


# class BListing():
#     """
#     # BListing represents an Airbnb room_id, as captured at a moment in time.
#     # room_id, survey_id is the primary key.
#     """

#     def __init__(self, config, driver, url, survey_id, checkin_date, checkout_date):
#         self.config = config

#         self.room_id = None
#         self.room_name = None
#         self.accommodates = None
#         self.price = None
#         self.bedtype = None
#         self.latitude = None
#         self.longitude = None
#         self.avg_rating = None
#         self.comodities = None
#         self.hotel_name = None
#         self.localized_address = None
#         self.property_type = None
#         self.reviews = None
#         self.survey_id = survey_id
#         self.checkin_date = checkin_date
#         self.checkout_date = checkout_date
#         self.hotel_id = None

#         self.start_date = dt.date.today() + dt.timedelta(days=15)
#         self.finish_date = dt.date.today() + dt.timedelta(days=16)
#         self.location_id = None

#     def find_room_id_and_name(self, row):
#         room_name = row.find_element(
#             By.CLASS_NAME, 'hprt-roomtype-link')
#         self.room_name = room_name.text

#         self.room_id = room_name.get_attribute("data-room-id")

#     def find_hotel_name(self, driver):
#         try:
#             element = driver.find_element(By.CSS_SELECTOR, '.pp-header__title')
#             self.hotel_name = element.text
#         except selenium.common.exceptions.NoSuchElementException:
#             raise

#     def find_localized_address(self, driver):
#         try:
#             element = driver.find_element(
#                 By.CSS_SELECTOR, '.js-hp_address_subtitle')
#             self.localized_address = element.text
#         except selenium.common.exceptions.NoSuchElementException:
#             raise

#     def find_accommodates(self, row):
#         try:
#             accommodates = row.find_elements(
#                 By.XPATH, "//td[2]/div/div/span[2]")
#             print(len(accommodates))
#             self.accommodates = len(accommodates) if accommodates else None
#             print("accommodates:", self.accommodates)
#         except:
#             raise

#     def find_bed_type(self, row):
#         bed_type = row.find_element(
#             By.CSS_SELECTOR, '.hprt-roomtype-bed')
#         self.bedtype = bed_type.text
#         # print("bedtype:", self.bedtype)
#         #

#     def find_price(self, row):
#         # preco
#         price = row.find_element(
#             By.CSS_SELECTOR, '.bui-price-display__value')
#         self.price = price.text.split('R$ ')[1]
#         # print("preco:", self.price)

#     def find_qtd_rooms(self, row):
#         qtd_rooms = 1
#         qtd_elem = row.find_elements(
#             By.XPATH, '//td[5]/div/select/option')

#         # print("a quantidade de options: ", len(qtd_elem))

#         if (len(qtd_elem) > 2):
#             # print(qtd_elem[len(qtd_elem)-1].text)
#             # print(qtd_elem[len(qtd_elem)-1].get_attribute("value"))
#             try:
#                 qtd_rooms = int(
#                     qtd_elem[len(qtd_elem)-1].get_attribute("value"))
#             except:
#                 qtd_rooms = 1

#         return qtd_rooms

#     def find_latlng(self, driver):  # ok
#         try:
#             element = driver.find_element(By.ID, 'hotel_header')
#             coordinates = element.get_attribute('data-atlas-latlng').split(',')
#             self.latitude = coordinates[0]
#             self.longitude = coordinates[1]
#         except selenium.common.exceptions.NoSuchElementException:
#             raise

#     def find_hotel_id(self, url):
#         name = url.split('www.booking.com/hotel/br/')[1]
#         name = name.split('.pt-br')[0]
#         print(name)
#         self.hotel_id = name

#     def find_property_type(self, driver):
#         try:
#             element = driver.find_element(
#                 By.CSS_SELECTOR, 'a.bui_breadcrumb__link_masked')
#             print(element.text)
#             if (element.text):
#                 print(element.text.split('(')[1].split(')')[0])
#                 x = element.text.split('(')[1].split(')')[0]
#                 self.property_type = x
#         except selenium.common.exceptions.NoSuchElementException:
#             raise

#     def find_overall_classification(self, driver):
#         try:
#             element = driver.find_element(
#                 By.CSS_SELECTOR, 'div.a3b8729ab1.d86cee9b25')
#             if ',' in element.text:
#                 self.avg_rating = float(element.text.replace(',', '.'))
#             else:
#                 if len(element.text) > 0:
#                     self.avg_rating = float(element.text)
#         except selenium.common.exceptions.NoSuchElementException:
#             raise
#         except:
#             raise

#     def find_principal_comodities(self, driver):
#         try:
#             element = driver.find_elements(
#                 By.CSS_SELECTOR, 'div.a815ec762e.ab06168e66')
#             comodities = []
#             for comodity in element:
#                 comodities.append(comodity.text)

#             self.comodities = comodities
#         except selenium.common.exceptions.NoSuchElementException:
#             raise

#     def find_reviews_quantity(self, driver):
#         try:
#             element = driver.find_element(By.XPATH, '//*[@rel="reviews"]')
#             if element.text is not None:
#                 r = element.text.split(
#                     'Avaliações de hóspedes (')[1].split(')')[0]
#                 self.reviews = float(r)
#         except selenium.common.exceptions.NoSuchElementException:
#             raise
#         except:
#             raise

#     def find_room_informations(self, driver):
#         try:
#             table_rows = driver.find_elements(
#                 By.XPATH, "//*[@id='hprt-table']/tbody/tr")
#             print(len(table_rows), " linhas")
#             for row in table_rows:
#                 try:
#                     self.find_room_id_and_name(row)
#                     self.find_bed_type(row)
#                 except selenium.common.exceptions.NoSuchElementException:
#                     pass

#                 self.find_accommodates(row)
#                 self.find_price(row)
#                 qtd_rooms = self.find_qtd_rooms(row)

#                 if (qtd_rooms > 2):
#                     for i in range(qtd_rooms):
#                         print("inserindo vez ", i+1)
#                         self.room_id = self.room_id.join(str(i))
#                 else:
#                     self.room_id = self.room_id.join('1')
#                     print(self.room_id)

#             exit(0)

#             # corrigir accommodates (ok)
#             # decidir entre ter 2 apis, configurar 1 so
#             # especificar no texto como as acomodacoes sao inseridas
#         except selenium.common.exceptions.NoSuchElementException:
#             raise


# def return_next_page(city, checkin_date, checkout_date, offset):
#     try:
#         url = "https://www.booking.com/searchresults.pt-br.html?ss={}&ssne={}&ssne_untouched={}&checkin={}&checkout={}&offset={}".format(
#             city, city, city, checkin_date, checkout_date, offset)
#         return prepare_driver(url)
#     except selenium.common.exceptions.ElementClickInterceptedException:
#         print("n foi pra proxima pagina")


# def find_properties_in_results_list(driver):
#     property_cards = driver.find_elements(
#         By.XPATH, '//*[@data-testid="property-card"]//*[@data-testid="title-link"]')
#     urls = []
#     for property_card in property_cards:
#         urls.append(property_card.get_attribute("href"))

#     return urls


# def scrap_page_data(config, driver, url, survey_id, checkin_date, checkout_date):
#     hotel_page = prepare_driver(url)

#     listing = BListing(config, driver, url,
#                        survey_id, checkin_date, checkout_date)

#     listing.find_hotel_id(url)
#     listing.find_latlng(hotel_page)
#     listing.find_principal_comodities(hotel_page)
#     listing.find_hotel_name(hotel_page)
#     listing.find_localized_address(hotel_page)
#     listing.find_reviews_quantity(hotel_page)
#     listing.find_overall_classification(hotel_page)
#     # print("vem aqui")
#     listing.find_property_type(hotel_page)

#     listing.find_room_informations(
#         hotel_page)  # needs to be the last call

#     hotel_page.quit()


# def search_booking_rooms(config, area, start_date, finish_date, survey_id):
#     print("Searching in Booking")
#     city = area.split(',')[0]

#     checkin_date = start_date
#     if checkin_date is None:
#         checkin_date = dt.date.today() + dt.timedelta(days=15)

#     checkout_date = finish_date
#     if checkout_date is None:
#         checkout_date = dt.date.today() + dt.timedelta(days=16)

#     url = "https://www.booking.com/searchresults.pt-br.html?ss={}&ssne={}&ssne_untouched={}&checkin={}&checkout={}".format(
#         city, city, city, checkin_date, checkout_date)
#     driver = prepare_driver(url)
#     print("aqui")

#     # FIND ALL PAGES
#     for i in range(config.ATTEMPTS_TO_FIND_PAGE):
#         offset = 0
#         try:
#             logger.debug("Attempt " + str(i+1) + " to find page")

#             urls = find_properties_in_results_list(driver)
#             print("as urls: ", urls)

#             if (len(urls) == 0):
#                 break
#             for url in urls:
#                 scrap_page_data(config, driver, url,
#                                 survey_id, checkin_date, checkout_date)

#             offset = offset + 25

#             driver = return_next_page(
#                 city, checkin_date, checkout_date, offset)
#         except selenium.common.exceptions.TimeoutException:
#             print("hmm")
#             continue
#         finally:
#             driver.quit()

#     driver.quit()


# def main():
#     search_booking_rooms(None, area='Ouro Preto, Minas Gerais',
#                          start_date=None, finish_date=None, survey_id=3)


# if __name__ == "__main__":
#     main()
