from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from general_config import ABConfig
import search
from file_manager import export_datatable
from general_dict import columnDict, get_all_airbnb_rooms
from utils import select_command

def buildChartObjectFromValueCounts(obj):
  result = []
  for key in obj.keys():
    result.append({ "label": key, "value": obj[key]})
  return result
  
ab_config = ABConfig()

app = Flask(__name__) # Dados de usuário armazenados em um dicionário
CORS(app)
users = { "adm": {"user_id": 1, "username": "adm", "password": "123", "name": "Victor Martins", "email": "fulano@example.com"},
        "user2": {"user_id": 2, "username": "user2", "password": "5678", "name": "Beltrano Oliveira", "email": "beltrano@example.com"}
        } # Rota de login

def send_nullable_value(data, key):
    try:
        return data[key]
    except:
        return None

# criar dicionario p converter valores numericos
@app.route('/super_survey/save', methods=['POST'])
def save_super_survey(): # Recebe o username e password do request em formato json
  data = request.get_json() # Verifica se o usuário existe no dicionário

  ss_id = search.full_process(config=ab_config,
                          platform=send_nullable_value(data, "platform"),
                          search_area_name=send_nullable_value(data, "city"),
                          user_id=send_nullable_value(data, "user_id"),
                          columns=send_nullable_value(data, "columns"),
                          clusterization_method=send_nullable_value(data, "clusterization_method"),
                          aggregation_method=send_nullable_value(data, "aggregation_method"),
                          fill_airbnb_with_selenium=send_nullable_value(data, "platform") == "Airbnb",
                          start_date=send_nullable_value(data, "start_date"),
                          finish_date=send_nullable_value(data, "finish_date"),
                          # status='0',
                          include_locality_search=send_nullable_value(data, "include_locality_search"),
                          include_route_search=send_nullable_value(data, "include_route_search"),
                        )
  response = jsonify({
      "object": { "super_survey_id": ss_id },
      "message": "Pesquisa cadastrada com sucesso!",
      "success": True
    })
  response.headers.add('Access-Control-Allow-Origin', '*')
  return response
  # finally:
  #     # Se os dados de login estiverem incorretos, retorna erro 401 - Unauthorized
  #     return jsonify({"message": "Falha ao iniciar pesquisa", "success": False}), 401 # Inicia a aplicação

@app.route('/super_survey/export', methods=['POST'])
def export_super_survey(): # Recebe o username e password do request em formato json
  data = request.get_json() # Verifica se o usuário existe no dicionário
  
  # try:
  response = jsonify({
      "object": export_datatable(ab_config, get_all_airbnb_rooms, 'Ouro Preto', "Airbnb", True),
      "message": "Dados retornados com sucesso!",
      "success": True
    })
  response.headers.add('Access-Control-Allow-Origin', '*')
  return response
  # finally:
  #     # Se os dados de login estiverem incorretos, retorna erro 401 - Unauthorized
  #     return jsonify({"message": "Falha ao iniciar pesquisa", "success": False}), 401 # Inicia a aplicação

@app.route('/details/getall', methods=['POST'])
def get_all_details(): # Recebe o username e password do request em formato json
  data = request.get_json() # Verifica se o usuário existe no dicionário
  columns="room_id, name, price, avg_rating, latitude, longitude"
  params = "WHERE price > 20 and avg_rating > 3"

  # try:
  response = jsonify({
      "object": export_datatable(ab_config, """
                    WITH consulta AS ( SELECT
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
                      SELECT {columns} FROM consulta {params}
                      """.format(columns=columns, params=params), '1', "Airbnb", True),
      "message": "Dados retornados com sucesso!",
      "success": True
    })
  response.headers.add('Access-Control-Allow-Origin', '*')
  return response
  # finally:
  #     # Se os dados de login estiverem incorretos, retorna erro 401 - Unauthorized
  #     return jsonify({"message": "Falha ao iniciar pesquisa", "success": False}), 401 # Inicia a aplicação

@app.route('/super_survey/getall', methods=['POST'])
def export_super_survey_info(): # Recebe o username e password do request em formato json
  data = request.get_json() # Verifica se o usuário existe no dicionário

  # try:
  response = jsonify({
      "object": export_datatable(ab_config, """
                    SELECT
                        ss_id,
                        city,
                        status,
                        logs,
                        date
                    FROM
                        super_survey
                    WHERE
                        user_id = 1
                    ORDER BY
                        ss_id desc
                  """, '1', "Airbnb", True),
      "message": "Dados retornados com sucesso!",
      "success": True
    })
  response.headers.add('Access-Control-Allow-Origin', '*')
  return response
  # finally:
  #     # Se os dados de login estiverem incorretos, retorna erro 401 - Unauthorized
  #     return jsonify({"message": "Falha ao iniciar pesquisa", "success": False}), 401 # Inicia a aplicação

@app.route('/api/login', methods=['POST'])
def login(): # Recebe o username e password do request em formato json
  data = request.get_json() # Verifica se o usuário existe no dicionário
  try:
    if data['username'] in users:
      user = users[data['username']]
    
    # Verifica se a senha do usuário está correta
    if user['password'] == data['password']:
        # Retorna os dados do usuário em formato json
        return jsonify({
            "object": {
              "name": user["name"], 
              "email": user["email"], 
              "id": user["user_id"] 
            },
            "message": "Sucesso ao realizar login",
            "success": True
          })
  except:
    # Se os dados de login estiverem incorretos, retorna erro 401 - Unauthorized
    return jsonify({"message": "Unauthorized", "success": False}), 401 # Inicia a aplicação

def asSelectObject(array):
  result = []
  for item in array:
    result.append({ "label": item[0], "value": item[0].replace(' ', '')})
  return result

def build_options(column, values):
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
						sql_script="""with consulta as ( SELECT
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
							select distinct({column}) from consulta
							""".format(column=column),
						params=(()),
						initial_message="Selecionando valores mínimo e máximo para " + str(column),
						failure_message="Falha ao selecionar valores mínimo e máximo para " + str(column)))


@app.route('/details/prepare', methods=['POST'])
def get_filters():
    data = request.get_json()
    columns = select_command(ab_config,
                              """SELECT data_columns
                                FROM super_survey_config where ss_id = %s""",
                                (data["ss_id"],),
                                "Selecionando colunas da configuração de pesquisa",
                                "Falha ao selecionar colunas da configuração de pesquisa"
                            )
    number_columns = []
    result_columns = []
    select_columns = []
    checkbox_columns = []

    if ( len(columns) > 0 ):
        columns = columns[0][0].split(' ')

    if ( "platform" in columns ):
      checkbox_columns.append({ "value": "platform", "type": "string", "label": "Plataforma", "options": [{ "label": "Todas", "value": "todas"}, { "label": "Airbnb", "value": "airbnb"}, {"label": "Booking", "value": "Booking"}] })

    excluded_columns = ["platform", "latitude", "longitude", "city"]
    for column in columns:
        if column in excluded_columns:
            continue
        if columnDict[column]["type"] == "string":
            result_columns.append({ "name": column, "type": columnDict[column]["type"], "label": columnDict[column]["label"], "required": False})
        elif columnDict[column]["type"] == "number":
            (min, max) = build_options(column, ["min", "max"])
            result_columns.append({ "name": column, "type": "range", "label": columnDict[column]["label"], "required": False, "min": min, "max": max })
        elif columnDict[column]["type"] == "select":
            options = build_options(column, ["options"])
            result_columns.append({ "name": column, "type": columnDict[column]["type"], "label": columnDict[column]["label"], "required": False, "options": options })
        elif columnDict[column]["type"] == "checkbox":
            options = build_options(column, ["options"])
            result_columns.append({ "name": column, "type": columnDict[column]["type"], "label": columnDict[column]["label"], "required": False, "options": options })
    
    return jsonify({
      "object": {
        "number_columns": number_columns,
        "select_columns": select_columns,
        "checkbox_columns": checkbox_columns,
        "result_columns": result_columns
      },
      "message": "Sucesso ao carregar filtros",
      "success": True
    })
                      
if __name__ == '__main__':
  app.run(debug=True)


# renderizar colunas e linhas (ok)
# criar tabela de config ou salvá-las no banco tbm (ok)
# mapa (ok)

# build p/ filtrar
# gráfico variável
# verificar retorno do login ao digitar dados errados
# exportar dados csv
# componentização do main.py