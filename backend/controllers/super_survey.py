from flask import jsonify
from config.general_config import ABConfig
import scrap.search as search
from utils.file_manager import export_datatable
from utils.general_dict import columnDict
from utils.general_dict import get_all_rooms_by_ss_id
from utils.functions import select_command, send_nullable_value, update_command
from utils.functions import buildFilterQuery, build_options
from utils.thread import Th

from utils.clusterization import cluster_data
from utils.functions import buildGraphObjectFromSqlResult, get_rooms, xNotIn, exclusive_airbnb_columns, exclusive_booking_columns

ab_config = ABConfig()


def save(data):
		ss_id = search.initialize_search(config=ab_config,
																		 platform=send_nullable_value(
																				 data, "platform"),
																		 search_area_name=send_nullable_value(
																				 data, "city"),
																		 user_id=send_nullable_value(
																				 data, "user_id"),
																		 columns=send_nullable_value(
																				 data, "columns"),
																		 clusterization_method=send_nullable_value(
																				 data, "clusterization_method"),
																		 aggregation_method=send_nullable_value(
																				 data, "aggregation_method"),
																		 start_date=send_nullable_value(
																				 data, "start_date"),
																		 finish_date=send_nullable_value(
																				 data, "finish_date"),
																		 include_locality_search=send_nullable_value(
																				 data, "include_locality_search"),
																		 include_route_search=send_nullable_value(
																				 data, "include_route_search"),
																		 )

		print("o ss_id: ", ss_id)
		thread = Th(1, data, ss_id)
		thread.start()

		response = jsonify({
				"object": {"super_survey_id": ss_id},
				"message": "Pesquisa cadastrada com sucesso!",
				"success": True
		})
		# response.headers.add('Access-Control-Allow-Origin', '*')
		return response
		# finally:
		#     # Se os dados de login estiverem incorretos, retorna erro 401 - Unauthorized
		#     return jsonify({"message": "Falha ao iniciar pesquisa", "success": False}), 401 # Inicia a aplicação


def restart(data):
		result = select_command(ab_config,
														"""SELECT platform, search_area_name, super_survey_config.user_id, data_columns,
																	clusterization_method, aggregation_method,
																	start_date, finish_date,
																	include_locality_search, include_route_search, status
																	FROM super_survey_config
																	LEFT JOIN super_survey
																	ON super_survey_config.ss_id = super_survey.ss_id
																	where super_survey_config.ss_id = %s
																	limit 1""",
														(data["ss_id"],),
														"Selecionando dado de configuração de pesquisa",
														"Falha ao selecionar dados de configurações de pesquisa")
		if not result:
				return jsonify({"message": "Falha ao selecionar dados de configurações de pesquisa", "success": False}), 500
		new_params = {
				"platform": result[0][0],
				"city": result[0][1],
				"user_id": result[0][2],
				"data_columns": result[0][3],
				"clusterization_method": result[0][4],
				"aggregation_method": result[0][5],
				"start_date": result[0][6],
				"finish_date": result[0][7],
				"include_locality_search": result[0][8],
				"include_route_search": result[0][9],
				"status": result[0][10]
		}

		print("a data agora:", new_params)
		thread = Th(1, new_params, data["ss_id"])
		thread.start()

		response = jsonify({
				"object": {"super_survey_id": data["ss_id"]},
				"message": "Pesquisa em andamento!",
				"success": True
		})
		# response.headers.add('Access-Control-Allow-Origin', '*')
		return response
		# finally:
		#     # Se os dados de login estiverem incorretos, retorna erro 401 - Unauthorized
		#     return jsonify({"message": "Falha ao iniciar pesquisa", "success": False}), 401 # Inicia a aplicação


def get_data_columns(args):  # ok
		try:
				result = []
				for x in columnDict:
						if (args.get("platform") in columnDict[x]["excludeIn"]):
								continue
						else:
								result.append({"label": columnDict[x]["label"], "value": x})

				return {
						"object": result,
						"message": "Sucesso ao retornar colunas para seleção de dados para coleta",
						"success": True
				}
		except:
				# Se os dados de login estiverem incorretos, retorna erro 401 - Unauthorized
				# Inicia a aplicação
				return {"message": "Erro ao retornar colunas para seleção de dados para coleta!", "success": False}

# specific survey


def getbyid(data):
		print(data)
		result = select_command(ab_config,
														"""SELECT platform, data_columns
																FROM super_survey_config where ss_id = %s
																limit 1""",
														(data["ss_id"],),
														"Selecionando colunas da configuração de pesquisa",
														"Falha ao selecionar colunas da configuração de pesquisa")
		if not result:
				return jsonify({
						"object": None,
						"message": "Falha ao selecionar colunas da configuração de pesquisa",
						"success": False
				})

		platform = data["platform"]
		print(result[0][1])
		try:
				columns = result[0][1].replace('{', '').replace('}', '').split(',')
				if (len(columns) == 1):
						columns = columns[0].split(' ')
				print("as colunas: ", columns)
		except:
				columns = result[0][1]
		agg_method = data["agg_method"]
		if ('platform' in columns):
				columns = columns.replace('platform, ', '')

		rooms = []
		if (platform == "both"):
				rooms = get_rooms(data, columns, agg_method)
		elif (platform == 'Airbnb'):
				(query, params) = buildFilterQuery(data, 'Airbnb')
				rooms = export_datatable(ab_config, """
											WITH consulta AS ( {consulta} )
												SELECT room_id, {columns} FROM consulta {query}
												""".format(consulta=get_all_rooms_by_ss_id(data["ss_id"], "'Airbnb'", agg_method), columns=xNotIn(exclusive_booking_columns, columns), query=query), params, "Airbnb", True, True)
		elif (platform == 'Booking'):
				(query, params) = buildFilterQuery(data, 'Booking')
				rooms = export_datatable(ab_config, """
											WITH consulta AS ( {consulta} )
												SELECT room_id, {columns} FROM consulta {query}
												""".format(consulta=get_all_rooms_by_ss_id(data["ss_id"], "'Booking'", agg_method), columns=xNotIn(exclusive_airbnb_columns, columns), query=query), params, "Booking", True, True)

		try:
				print("aqui", rooms)
				response = jsonify({
						"object": {"table": cluster_data(data["clusterization_method"], rooms["df"], rooms["table"], data), "extra_info": agg_method},
						"message": "Dados retornados com sucesso!",
						"success": True
				})
		except KeyError:
				print("erro")
				response = jsonify({
						"object": {"table": { "columns": [], "rows": []}, "extra_info": agg_method},
						"message": "Dados retornados com sucesso!",
						"success": True
				})

		# response.headers.add('Access-Control-Allow-Origin', '*')
		return response
		# finally:
		#     # Se os dados de login estiverem incorretos, retorna erro 401 - Unauthorized
		#     return jsonify({"message": "Falha ao iniciar pesquisa", "success": False}), 401 # Inicia a aplicação


def prepare(data):  # adicionar campo p/ visualizar cluster específico
		result = select_command(ab_config,
														"""SELECT platform, data_columns
																FROM super_survey_config where ss_id = %s
																limit 1""",
														(data["ss_id"],),
														"Selecionando colunas da configuração de pesquisa",
														"Falha ao selecionar colunas da configuração de pesquisa")
		if not result:
				return jsonify({
						"object": None,
						"message": "Falha ao selecionar colunas da configuração de pesquisa",
						"success": False
				})

		platform = result[0][0]

		print(result[0][1])
		try:
				columns = result[0][1].replace('{', '').replace('}', '').split(',')
				if (len(columns) == 1):
						columns = columns[0].split(' ')
				print("as colunas: ", columns)
		except:
				columns = result[0][1]

		numeric_columns = [{"label": "Nenhum", "value": "nenhum"}]
		result_columns = [{
				"name": "ss_id",
				"label": "Código Identificador da Pesquisa",
				"disabled": False,
				"required": True,
				"type": "hidden-number",
		},
				{
				"name": "clusterization_method",
						"label": "Método de Agrupamento",
						"disabled": False,
						"required": False,
						"type": "radio",
						"options": [
										{"label": "Sem agrupamento", "value": "none"},
										{"label": "Birch", "value": "birch"},
										{"label": "DBScan", "value": "dbscan"},
										{"label": "K-Modes", "value": "kmodes"},
						],
				"description": "Agrupamento se refere ao processo de gerar grupos menores dentro dos dados coletados a partir de características semelhantes entre eles. Para saber mais sobre cada um dos três métodos disponíveis, acesse: https://scikit-learn.org/stable/modules/clustering.html#birch"
		},
				{
				"name": "agg_method",
						"label": "Método de Agregação para seleção de dados repetidos:",
						"disabled": False,
						"required": False,
						"type": "radio",
						"options": [
										{"label": "Média", "value": "_avg"},
										{"label": "Menor valor", "value": "_min"},
										{"label": "Maior valor", "value": "_max"},
										{"label": "Manter duplicatas", "value": "_repeat"},
						]
		},]
		str_columns = []

		if (platform == 'both'):
				result_columns.append({"name": "platform", "type": "radio", "label": "Plataforma", "required": True, "options": [
															{"label": "Todas", "value": "both"}, {"label": "Airbnb", "value": "Airbnb"}, {"label": "Booking", "value": "Booking"}]})

		excluded_columns = ["platform", "latitude", "longitude", "city", "host_id"]
		for column in columns:
				if (column == 'host_id'):
						str_columns.append(
								{"label": columnDict[column]["label"], "value": column})
						result_columns.append(
								{"name": column, "type": columnDict[column]["type"], "label": columnDict[column]["label"], "required": False})
				if column in excluded_columns:
						continue
				elif columnDict[column]["type"] == "string":
						result_columns.append(
								{"name": column, "type": columnDict[column]["type"], "label": columnDict[column]["label"], "required": False})
				elif columnDict[column]["type"] == "number":
						(min, max) = build_options(column, ["min", "max"], data["ss_id"])
						result_columns.append({"name": column, "type": "range",
																	"label": columnDict[column]["label"], "required": False, "min": min, "max": max})
						numeric_columns.append(
								{"label": columnDict[column]["label"], "value": column})
				elif columnDict[column]["type"] == "select":
						options = build_options(column, ["options"], data["ss_id"])
						result_columns.append(
								{"name": column, "type": columnDict[column]["type"], "label": columnDict[column]["label"], "required": False, "options": options})
						str_columns.append(
								{"label": columnDict[column]["label"], "value": column})
				elif columnDict[column]["type"] == "checkbox":
						options = build_options(column, ["options"], data["ss_id"])
						result_columns.append(
								{"name": column, "type": columnDict[column]["type"], "label": columnDict[column]["label"], "required": False, "options": options})
						str_columns.append(
								{"label": columnDict[column]["label"], "value": column})
		return jsonify({
				"object": {
						"numeric_columns": numeric_columns,
						"str_columns": str_columns,
						"result_columns": result_columns
				},
				"message": "Sucesso ao carregar filtros",
				"success": True
		})


def prepare_filter(args):  # ok
		print(args)
		platform = select_command(ab_config,
															"""SELECT platform
																FROM super_survey_config where ss_id = %s
																limit 1""",
															(args.get("ss_id"),),
															"Selecionando colunas da configuração de pesquisa",
															"Falha ao selecionar colunas da configuração de pesquisa")

		print(platform)
		return jsonify({
				"object": {
						"ss_id": args.get("ss_id"),
						"agg_method": "_avg",
						"clusterization_method": "none",
						"platform": platform[0][0],
						"n_clusters": 3,
						"init": 'Huang',
						"n_init": 3,
						"eps": 3,
						"min_samples": 50,
						"threshold": 0.5,
						"branching_factor": 200,
				},
				"message": "Sucesso ao selecionar colunas da configuração de pesquisa",
				"success": True
		})


def chart(data):  # ok
		if ((data["agg_method"] != "count") and (data["number_column"] == "nenhum")):
				return jsonify({
						"object": None,
						"message": "Selecione um campo numérico para criar a relação entre os dados!",
						"success": False
				})
		# try:

		if (data["number_column"] == "nenhum"):
				data["number_column"] = data["str_column"]

		agg_method = data["aggregation_method"]
		unformated_chart_data = select_command(ab_config,
																					 sql_script="""
						with consulta as ( {consulta} )
							select distinct({str_column}), {agg_method}({number_column}) as "{agg_method} de {number_column} por {str_column}" from consulta
							group by {str_column}
							order by {agg_method}({number_column}) desc
							""".format(consulta=get_all_rooms_by_ss_id(data["ss_id"], "'Airbnb'", agg_method), str_column=data['str_column'], number_column=data['number_column'], agg_method=data['agg_method']),
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

def update(data):  # ok
		try:
				print(data)

				ss_id = update_command(ab_config,
						sql_script="""update super_survey set status=%s where ss_id = %s returning ss_id""",
						params=((data["newStatus"], data["ss_id"])),
						initial_message="Atualizando status da pesquisa...",
						failure_message="Falha ao atualizar status da pesquisa")
				if ss_id:
					return jsonify({
              "object": None,
              "message": "Sucesso ao atualizar status da pesquisa",
              "success": True
          })
				else:
					return jsonify({
              "object": None,
              "message": "Falha ao atualizar status da pesquisa",
              "success": False
          })
		except:
			# Se os dados de login estiverem incorretos, retorna erro 401 - Unauthorized
			return jsonify({"message": "Erro ao atualizar status da pesquisa", "success": False}), 401 # Inicia a aplicação
