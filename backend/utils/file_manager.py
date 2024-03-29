import pandas as pd
import argparse
import logging
from config.general_config import ABConfig
from utils.general_dict import columnDict

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


def export_datatable(config, sql_command, params, project, toJson, toPandas=False):
    try:
        logging.info(
            "Initializing export {project}'s rooms".format(project=project))
        conn = config.connect()
        cur = conn.cursor()
        cnxn = config.connect()
        print(sql_command, params if (type(params) == tuple) else ())
        cur.execute(sql_command, params if (type(params) == tuple) else ())

        if (toJson):
            results = cur.fetchall()
            # print("OS RESULTADOS::::", results)

            # Cria um dicionário com os resultados
            data = []
            for row in results:
                d = {}
                for idx, col in enumerate(cur.description):
                    if (col[0] == 'price'):
                        d[col[0]] = "${:.2f}".format(
                            row[idx]) if row[idx] else None
                    elif (col[0] in ['last_updated', 'date']):
                        d[col[0]] = row[idx].strftime(
                            '%d/%b/%Y') if row[idx] else None
                    else:
                        d[col[0]] = row[idx]
                data.append(d)
            cur.close()
            conn.close()

            if (toPandas):
                print("veio aqui na 52")
                df = pd.DataFrame(results)
                print("59")
                # df = df.T.drop_duplicates().T  # in case of duplicate columns
                if ((len(data) > 0) and (data[0])):
                    print("veio na 62")
                    print(data[0].keys())
                    df.columns = data[0].keys()
                    print("64")
                    if (len(data) > 0):
                        print("a")
                        return {"table": {"columns": buildColumnsObject(data[0].keys()), "rows": data}, "df": df}
                    else:
                        print("b")
                        return {"table": {"columns": [], "rows": []}, "df": df}
                else:
                    print("c")
                    return {"table": {"columns": [], "rows": []}, "df": df}
            else:
                if (len(data) > 0):
                    print("d")
                    # print(data[0].keys(), data)
                    print("dd")
                    return {"columns": buildColumnsObject(data[0].keys()), "rows": data}
                else:
                    print("e")
                    return {"columns": [], "rows": []}
        else:
            print("sSEM RESULTADOS")
            return {"columns": [], "rows": []}
    except Exception as e:
        print(e)
        return {"columns": [], "rows": []}
    finally:
        try:
            cur.close()
            conn.close()
            print("fechando conexão")
        except:
            print("n teve conexão pra fechar aqui")
            pass


def main():
    parser = \
        argparse.ArgumentParser(
            description="Create a spreadsheet of surveys from a city")
    parser.add_argument("-cfg", "--config_file",
                        metavar="config_file", action="store", default=None,
                        help="""explicitly set configuration file, instead of
                        using the default <username>.config""")
    parser.add_argument('-ss', '--ss_id',
                        metavar='city', action='store',
                        help="""id of super_survey to export""")
    parser.add_argument('-p', '--project',
                        metavar='project', action='store', default="public",
                        help="""the project determines the table or view: public
                        for room, gis for listing_city, default public""")
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
