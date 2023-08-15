import os
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
from utils.sql_commands import select_command

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
            if data[key] is None:
                continue
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
											SELECT {columns}, platform FROM consulta {query}
											""".format(consulta=get_all_rooms_by_ss_id(data["ss_id"], agg_method=agg_method), columns=columns, query=query), params, "Airbnb", True, True)
    return rooms


def xNotIn(exclusive_list, other_list):
    result = []
    try:
        other_list = other_list.split(', ')
    except AttributeError:
        pass
    for x in other_list:
        if x not in exclusive_list:
            result.append(x)
    return ', '.join(result)
