from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from general_config import ABConfig
import search
from file_manager import export_datatable
from general_dict import columnDict, get_airbnb_rooms_by_ss_id
from utils import select_command, insert_command, update_command
from utils import buildChartObjectFromValueCounts, send_nullable_value
from utils import removeLastWordOfString, buildFilterQuery, asSelectObject, build_options
	
ab_config = ABConfig()

app = Flask(__name__) # Dados de usuário armazenados em um dicionário
CORS(app)

# criar dicionario p converter valores numericos
@app.route('/super_survey/save', methods=['POST'])
def save_super_survey(): # Recebe o username e password do request em formato json
	data = request.get_json() # Verifica se o usuário existe no dicionário

	ss_id = search.initialize_search(config=ab_config,
													platform=send_nullable_value(data, "platform"),
													search_area_name=send_nullable_value(data, "city"),
													user_id=send_nullable_value(data, "user_id"),
													columns=send_nullable_value(data, "columns"),
													clusterization_method=send_nullable_value(data, "clusterization_method"),
													aggregation_method=send_nullable_value(data, "aggregation_method"),
													fill_airbnb_with_selenium=send_nullable_value(data, "platform") == "Airbnb",
													start_date=send_nullable_value(data, "start_date"),
													finish_date=send_nullable_value(data, "finish_date"),
													include_locality_search=send_nullable_value(data, "include_locality_search"),
													include_route_search=send_nullable_value(data, "include_route_search"),
												)

	thread = Th(1, data, ss_id)
	thread.start()
												
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
			"object": export_datatable(ab_config, get_airbnb_rooms_by_ss_id(data["ss_id"]), None, "Airbnb", True),
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
												user_id = %s
										ORDER BY
												ss_id desc
									""", (data['user_id'],), "Airbnb", True),
			"message": "Dados retornados com sucesso!",
			"success": True
		})
	response.headers.add('Access-Control-Allow-Origin', '*')
	return response
	# finally:
	#     # Se os dados de login estiverem incorretos, retorna erro 401 - Unauthorized
	#     return jsonify({"message": "Falha ao iniciar pesquisa", "success": False}), 401 # Inicia a aplicação


@app.route('/details/getbyid', methods=['POST'])
def get_all_details(): # Recebe o username e password do request em formato json
	data = request.get_json() # Verifica se o usuário existe no dicionário
	columns = select_command(ab_config,
															"""SELECT data_columns
																FROM super_survey_config where ss_id = %s""",
																(data["ss_id"],),
																"Selecionando colunas da configuração de pesquisa",
																"Falha ao selecionar colunas da configuração de pesquisa")[0][0].replace(' ', ', ')
	if ( 'platform' in columns):
			columns = columns.replace('platform, ', '')
	(query, params) = buildFilterQuery(data)

	# try:
	response = jsonify({
			"object": export_datatable(ab_config, """
										WITH consulta AS ( {consulta} ) 
											SELECT {columns} FROM consulta {query}
											""".format(consulta=get_airbnb_rooms_by_ss_id(data["ss_id"]), columns=columns, query=query), params, "Airbnb", True),
			"message": "Dados retornados com sucesso!",
			"success": True
		})
	response.headers.add('Access-Control-Allow-Origin', '*')
	return response
	# finally:
	#     # Se os dados de login estiverem incorretos, retorna erro 401 - Unauthorized
	#     return jsonify({"message": "Falha ao iniciar pesquisa", "success": False}), 401 # Inicia a aplicação

@app.route('/details/prepare', methods=['POST'])
def get_filters():
		data = request.get_json()
		columns = select_command(ab_config,
															"""SELECT data_columns
																FROM super_survey_config where ss_id = %s""",
																(data["ss_id"],),
																"Selecionando colunas da configuração de pesquisa",
																"Falha ao selecionar colunas da configuração de pesquisa")
		numeric_columns = [{ "label": "Nenhum", "value": "nenhum" }]
		result_columns = []
		str_columns = []

		if ( len(columns) > 0 ):
				columns = columns[0][0].split(' ')

		# if ( "platform" in columns ):
		# 	result_columns.append({ "value": "platform", "type": "radio", "label": "Plataforma", "required": True, "options": [{ "label": "Todas", "value": "todas"}, { "label": "Airbnb", "value": "airbnb"}, {"label": "Booking", "value": "Booking"}] })

		excluded_columns = ["platform", "latitude", "longitude", "city"]
		for column in columns:
				if column in excluded_columns:
						continue
				if columnDict[column]["type"] == "string":
						result_columns.append({ "name": column, "type": columnDict[column]["type"], "label": columnDict[column]["label"], "required": False})
				elif columnDict[column]["type"] == "number":
						(min, max) = build_options(column, ["min", "max"], data["ss_id"])
						result_columns.append({ "name": column, "type": "range", "label": columnDict[column]["label"], "required": False, "min": min, "max": max })
						numeric_columns.append({ "label": columnDict[column]["label"], "value": column })
				elif columnDict[column]["type"] == "select":
						options = build_options(column, ["options"], data["ss_id"])
						result_columns.append({ "name": column, "type": columnDict[column]["type"], "label": columnDict[column]["label"], "required": False, "options": options })
						str_columns.append({ "label": columnDict[column]["label"], "value": column })
				elif columnDict[column]["type"] == "checkbox":
						options = build_options(column, ["options"], data["ss_id"])
						result_columns.append({ "name": column, "type": columnDict[column]["type"], "label": columnDict[column]["label"], "required": False, "options": options })
						str_columns.append({ "label": columnDict[column]["label"], "value": column })
		return jsonify({
			"object": {
				"numeric_columns": numeric_columns,
				"str_columns": str_columns,
				"result_columns": result_columns
			},
			"message": "Sucesso ao carregar filtros",
			"success": True
		})

@app.route('/details/chart', methods=['POST'])
def details_chart(): # Recebe o username e password do request em formato json
		data = request.get_json() # Verifica se o usuário existe no dicionário
		if ( (data["agg_method"] != "count") and (data["number_column"] == "nenhum")):
			return jsonify({
				"object": null,
				"message": "Selecione um campo numérico para criar a relação entre os dados!",
				"success": False
			})
		# try:

		if ( data["number_column"] == "nenhum" ):
			data["number_column"] = data["str_column"]
		
		unformated_chart_data = select_command(ab_config,
						sql_script="""
						with consulta as ( {consulta} )
							select distinct({str_column}), {agg_method}({number_column}) as "{agg_method} de {number_column} por {str_column}" from consulta
							group by {str_column}
							""".format(consulta=get_airbnb_rooms_by_ss_id(data["ss_id"]), str_column=data['str_column'], number_column=data['number_column'], agg_method=data['agg_method']),
						params=(()),
						initial_message="Selecionando dados para gerar gráfico...",
						failure_message="Falha ao selecionar dados para gerar gráfico")
		return jsonify({
				"object": buildGraphObjectFromSqlResult(unformated_chart_data),
				"message": "Sucesso ao gerar gráfico",
				"success": True
			})
	# except:
	# 	# Se os dados de login estiverem incorretos, retorna erro 401 - Unauthorized
	# 	return jsonify({"message": "Erro ao selecionar dados para gerar gráfico!", "success": False}), 401 # Inicia a aplicação

def buildGraphObjectFromSqlResult(data):
	result = []
	for item in data:
		result.append({"label": item[0], "value": item[1]})
	return [{ "values": result }]

@app.route('/api/login', methods=['POST'])
def login(): # Recebe o username e password do request em formato json
	data = request.get_json() # Verifica se o usuário existe no dicionário
	try:
		user_data = select_command(ab_config,
						sql_script="""SELECT user_id, name, email, login from users where login = %s and password = %s""",
						params=((data['username'], data['password'])),
						initial_message="Autenticando usuario...",
						failure_message="Falha ao realizar login")
		if user_data[0][3] == data['username']:
			return jsonify({
					"object": {
						"user_id": user_data[0][0],
						"name": user_data[0][1], 
						"email": user_data[0][2], 
						"login": user_data[0][3]
					},
					"message": "Sucesso ao realizar login",
					"success": True
				})
		else:
			return jsonify({"message": "Erro ao realizar login!", "success": False}), 401 # Inicia a aplicação
	except:
		# Se os dados de login estiverem incorretos, retorna erro 401 - Unauthorized
		return jsonify({"message": "Erro ao realizar login!", "success": False}), 401 # Inicia a aplicação

@app.route('/api/register', methods=['POST'])
def register(): # Recebe o username e password do request em formato json
	data = request.get_json() # Verifica se o usuário existe no dicionário
	try:
		user_data = insert_command(ab_config,
						sql_script="""INSERT INTO users(name, email, login, password) values(%s, %s, %s, %s) returning user_id""",
						params=((data["name"], data["email"], data['username'], data['password'])),
						initial_message="Autenticando usuario...",
						failure_message="Falha ao cadastrar usuário")
		print("o id:", user_data)
		if user_data:
			return jsonify({
					"object": {
						"user_id": user_data,
						"name": data["name"], 
						"email": data["email"], 
						"login": data["username"]
					},
					"message": "Sucesso ao cadastrar usuário",
					"success": True
				})
		else:
			return jsonify({"message": "Erro ao cadastrar usuário!", "success": False}), 401 # Inicia a aplicação
	except:
		# Se os dados de login estiverem incorretos, retorna erro 401 - Unauthorized
		return jsonify({"message": "Erro ao cadastrar usuário!", "success": False}), 401 # Inicia a aplicação

@app.route('/api/edit_user', methods=['POST'])
def edit_user(): # Recebe o username e password do request em formato json
		data = request.get_json() # Verifica se o usuário existe no dicionário
		# try:
		user_data = update_command(ab_config,
						sql_script="""UPDATE users set name = %s, email = %s, login = %s where user_id = %s returning user_id""",
						params=((data["name"], data["email"], data['username'], data['userId'])),
						initial_message="Atualizando dados do usuario...",
						failure_message="Falha ao atualizar dados do usuário")
		print("o id:", user_data)
		if user_data:
			return jsonify({
					"object": {
						"user_id": data["userId"], 
						"name": data["name"], 
						"email": data["email"], 
						"login": data["username"]
					},
					"message": "Sucesso ao atualizar dados do usuário",
					"success": True
				})
		else:
			return jsonify({"message": "Erro ao atualizar dados do usuário!", "success": False}), 401 # Inicia a aplicação
	# except:
	# 	# Se os dados de login estiverem incorretos, retorna erro 401 - Unauthorized
	# 	return jsonify({"message": "Erro ao cadastrar usuário!", "success": False}), 401 # Inicia a aplicação


@app.route('/api/change_password', methods=['POST'])
def change_password(): # Recebe o username e password do request em formato json
	data = request.get_json() # Verifica se o usuário existe no dicionário
	try:
		user_data = insert_command(ab_config,
						sql_script="""UPDATE users set password = %s where user_id = %s returning user_id""",
						params=((data["password"], data["userId"])),
						initial_message="Atualizando senha do usuário...",
						failure_message="Falha ao atualizar senha do usuário")
		if user_data:
			return jsonify({
					"object": None,
					"message": "Sucesso ao atualizar senha do usuário",
					"success": True
				})
		else:
			return jsonify({"message": "Erro ao atualizar senha do usuário!", "success": False}), 401 # Inicia a aplicação
	except:
		# Se os dados de login estiverem incorretos, retorna erro 401 - Unauthorized
		return jsonify({"message": "Erro ao atualizar senha do usuário!", "success": False}), 401 # Inicia a aplicação

@app.route('/api/forgot_password', methods=['POST'])
def forgot_password(): # Recebe o username e password do request em formato json
	data = request.get_json() # Verifica se o usuário existe no dicionário
	try:
		user_data = insert_command(ab_config,
						sql_script="""UPDATE users set password = %s where email = %s returning user_id""",
						params=((data["password"], data["email"])),
						initial_message="Atualizando senha do usuário...",
						failure_message="Falha ao atualizar senha do usuário")
		if user_data:
			return jsonify({
					"object": None,
					"message": "Sucesso ao atualizar senha do usuário",
					"success": True
				})
		else:
			return jsonify({"message": "Erro ao atualizar senha do usuário!", "success": False}), 401 # Inicia a aplicação
	except:
		# Se os dados de login estiverem incorretos, retorna erro 401 - Unauthorized
		return jsonify({"message": "Erro ao atualizar senha do usuário!", "success": False}), 401 # Inicia a aplicação

if __name__ == '__main__':
	app.run(debug=True)


# exportar dados csv (ok)
# alterar login para selecionar do bd (ok)
# metodo user info (salvar user_id no local storage??) (ok)
# relacionar tudo com ss_id real (ok no back, o user.user_id no front) (ok)
# salvar userId e user Name no window storage
# gráfico de 2 eixos (ok)
# paginação na tabela (ok)
# cadastro (ok)
# editar usuário (ok)
# trocar senha (ok)
# visual das tabelas, incluindo paginação (ok)

# continuar pesquisa
# pesquisar via thread
# tratamento de exceções do full_process
# set loading false após filtrar (teoricamente ok)