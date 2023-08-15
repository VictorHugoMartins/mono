from fastapi.encoders import jsonable_encoder

from config.general_config import ABConfig
from utils.file_manager import export_datatable
from utils.general_dict import get_all_rooms_by_ss_id

from utils.file_manager import export_datatable
from utils.functions import buildFilterQuery, build_options
from utils.clusterization import cluster_data
from utils.functions import buildGraphObjectFromSqlResult, get_rooms, xNotIn, exclusive_airbnb_columns, exclusive_booking_columns
from utils.general_dict import get_all_rooms_by_ss_id
from utils.sql_commands import select_command

from utils.general_dict import columnDict

from models.nav import *

ab_config = ABConfig()


def export(data: ExportModel):  # ok
    try:
        response = {
            "object": export_datatable(ab_config, get_all_rooms_by_ss_id(data.ss_id), None, "Airbnb", True),
            "message": "Dados retornados com sucesso!",
            "success": True
        }

        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except:
        return {"message": "Falha ao exportar dados", "success": False}


def list(data: ListModel):  # ok
    try:
        print("nesse")
        response = {
            "object": export_datatable(ab_config, """SELECT ss_id, city, status, logs, date FROM super_survey WHERE user_id = %s ORDER BY ss_id desc""", (data.user_id,), "Airbnb", True),
            "message": "Dados retornados com sucesso!",
            "success": True
        }

        return response
    except KeyError:
        response = {"message": "Faça login!", "success": False, "status": 401}
        return response
    except Exception as e:
        print("uai", e)
        return {"message": "Falha ao buscar dados", "success": False}


def public_getall():  # ok
    try:
        response = {
            "object": export_datatable(ab_config, """
													select distinct(city), count(city) as survey_qtd, max(date) as last_updated from super_survey where city is not null group by city order by last_updated desc
												""", None, None, True),
            "message": "Dados retornados com sucesso!",
            "success": True
        }
        print("o response: ", response)

        return response
    except:
        return {"message": "Falha ao buscar dados!", "success": False}


def getbycity(data: GetByCityModel):  # ok
    try:
        response = {
            "object": export_datatable(ab_config, """
											select ss_id, date, logs from super_survey where city = %s order by date desc
										""", (data.city,), None, True),
            "message": "Dados retornados com sucesso!",
            "success": True
        }

        return response
    except:
        response = {"message": "Falha ao buscar pesquisas!",
                    "success": False, "status": 500}
        return response


def getbyid(original_data: GetByIdModel):
    data = jsonable_encoder(original_data)
    result = select_command(ab_config,
                            """SELECT platform, data_columns
																FROM super_survey_config where ss_id = %s
																limit 1""",
                            (data["ss_id"],),
                            "Selecionando colunas da configuração de pesquisa",
                            "Falha ao selecionar colunas da configuração de pesquisa")
    if not result:
        return {
            "object": None,
            "message": "Falha ao selecionar colunas da configuração de pesquisa",
            "success": False
        }

    platform = data["platform"]

    try:
        columns = result[0][1].replace('{', '').replace('}', '').split(',')
        if (len(columns) == 1):
            columns = columns[0].split(' ')
        print("as colunas: ", columns)
    except:
        columns = result[0][1]
    aggregation_method = data["aggregation_method"]
    if ('platform' in columns):
        columns = columns.replace('platform, ', '')

    rooms = []
    if (platform == "both"):
        rooms = get_rooms(data, columns, aggregation_method)
    elif (platform == 'Airbnb'):
        (query, params) = buildFilterQuery(data, 'Airbnb')
        rooms = export_datatable(ab_config, """
											WITH consulta AS ( {consulta} )
												SELECT {columns}, 'Airbnb' as platform FROM consulta {query}
												""".format(consulta=get_all_rooms_by_ss_id(data["ss_id"], "'Airbnb'", aggregation_method), columns=xNotIn(exclusive_booking_columns, columns), query=query), params, "Airbnb", True, True)
    elif (platform == 'Booking'):
        (query, params) = buildFilterQuery(data, 'Booking')
        rooms = export_datatable(ab_config, """
											WITH consulta AS ( {consulta} )
												SELECT {columns}, 'Booking' as platform FROM consulta {query}
												""".format(consulta=get_all_rooms_by_ss_id(data["ss_id"], "'Booking'", aggregation_method), columns=xNotIn(exclusive_airbnb_columns, columns), query=query), params, "Booking", True, True)

    try:
        # print("aqui", rooms)
        response = {
            "object": {"table": cluster_data(data["clusterization_method"], rooms["df"], rooms["table"], data), "extra_info": aggregation_method},
            "message": "Dados retornados com sucesso!",
            "success": True
        }
    except KeyError as a:
        print("erro", a)
        response = {
            "object": {"table": {"columns": [], "rows": []}, "extra_info": aggregation_method},
            "message": "Dados retornados com sucesso!",
            "success": True
        }

    return response
    # finally:
    #     # Se os dados de login estiverem incorretos, retorna erro 401 - Unauthorized
    #     return {"message": "Falha ao iniciar pesquisa", "success": False}


def prepare(data: PrepareModel):  # adicionar campo p/ visualizar cluster específico
    result = select_command(ab_config,
                            """SELECT platform, data_columns
																FROM super_survey_config where ss_id = %s
																limit 1""",
                            (data.ss_id,),
                            "Selecionando colunas da configuração de pesquisa",
                            "Falha ao selecionar colunas da configuração de pesquisa")
    if not result:
        return {
            "object": None,
            "message": "Falha ao selecionar colunas da configuração de pesquisa",
            "success": False
        }

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
            {"label": "Sem agrupamento",
             "value": "none"},
            {"label": "Birch",
             "value": "birch"},
            {"label": "DBScan",
             "value": "dbscan"},
            {"label": "K-Derivados",
             "value": "kmodes"},
        ],
        "description": "Agrupamento se refere ao processo de gerar grupos menores dentro dos dados coletados a partir de características semelhantes entre eles. Para saber mais sobre cada um dos três métodos disponíveis, acesse: https://scikit-learn.org/stable/modules/clustering.html"
    },
        {
        "name": "aggregation_method",
        "label": "Método de Agregação para seleção de dados repetidos:",
        "disabled": False,
        "required": False,
        "type": "radio",
        "options": [
            {"label": "Média", "value": "_avg"},
            {"label": "Menor valor",
             "value": "_min"},
            {"label": "Maior valor",
             "value": "_max"},
            {"label": "Manter duplicatas",
             "value": "_repeat"},
        ]
    },]
    str_columns = []

    if (platform == 'both'):
        result_columns.append({"name": "platform", "type": "radio", "label": "Plataforma", "required": True, "options": [
            {"label": "Todas", "value": "both"}, {"label": "Airbnb", "value": "Airbnb"}, {"label": "Booking", "value": "Booking"}]})

    excluded_columns = ["platform", "latitude", "longitude", "city", "host_id"]
    for column in columns:
        if (column == 'host_id'):
            # str_columns.append(
            #     {"label": columnDict[column]["label"], "value": column})
            result_columns.append(
                {"name": column, "type": columnDict[column]["type"], "label": columnDict[column]["label"], "required": False})
        if column in excluded_columns:
            continue
        elif columnDict[column]["type"] == "string":
            result_columns.append(
                {"name": column, "type": columnDict[column]["type"], "label": columnDict[column]["label"], "required": False})
        elif columnDict[column]["type"] == "number":
            (min, max) = build_options(column, ["min", "max"], data.ss_id)
            result_columns.append({"name": column, "type": "range",
                                   "label": columnDict[column]["label"], "required": False, "min": min, "max": max})
            numeric_columns.append(
                {"label": columnDict[column]["label"], "value": column})
        elif columnDict[column]["type"] == "select":
            options = build_options(column, ["options"], data.ss_id)
            result_columns.append(
                {"name": column, "type": columnDict[column]["type"], "label": columnDict[column]["label"], "required": False, "options": options})
            str_columns.append(
                {"label": columnDict[column]["label"], "value": column})
        elif columnDict[column]["type"] == "checkbox":
            options = build_options(column, ["options"], data.ss_id)
            result_columns.append(
                {"name": column, "type": columnDict[column]["type"], "label": columnDict[column]["label"], "required": False, "options": options})
            str_columns.append(
                {"label": columnDict[column]["label"], "value": column})
    return {
        "object": {
            "numeric_columns": numeric_columns,
            "str_columns": str_columns,
            "result_columns": result_columns
        },
        "message": "Sucesso ao carregar filtros",
        "success": True
    }


def prepare_filter(ss_id: str):  # ok
    platform = select_command(ab_config,
                              """SELECT platform
																FROM super_survey_config where ss_id = %s
																limit 1""",
                              (ss_id,),
                              "Selecionando colunas da configuração de pesquisa",
                              "Falha ao selecionar colunas da configuração de pesquisa")

    print(platform)
    return {
        "object": {
            "ss_id": ss_id,
            "aggregation_method": "_avg",
            "clusterization_method": "none",
            "platform": platform[0][0],
            "n_clusters": 3,
            "init": 'Huang',
            "n_init": 3,
            "eps": 3,
            "min_samples": 50,
            "threshold": 0.5,
            "branching_factor": 200,
            "cluster_parameters": "nao"
        },
        "message": "Sucesso ao selecionar colunas da configuração de pesquisa",
        "success": True
    }


def chart(data: ChartModel):  # ok
    if ((data.aggregation_method != "count") and (data.number_column == "nenhum")):
        return {
            "object": None,
            "message": "Selecione um campo numérico para criar a relação entre os dados!",
            "success": False
        }
    try:

        if (data.number_column == "nenhum"):
            data.number_column = data.str_column

        aggregation_method = data.aggregation_method
        unformated_chart_data = select_command(ab_config,
                                               sql_script="""
              with consulta as ( {consulta} )
                select distinct({str_column}), {aggregation_method}({number_column}) as "{aggregation_method} de {number_column} por {str_column}" from consulta
                group by {str_column}
                order by {aggregation_method}({number_column}) desc
                """.format(consulta=get_all_rooms_by_ss_id(data.ss_id, "'Airbnb'", aggregation_method), str_column=data.str_column, number_column=data.number_column, aggregation_method=data.aggregation_method),
            params=(()),
            initial_message="Selecionando dados para gerar gráfico...",
            failure_message="Falha ao selecionar dados para gerar gráfico")
        return {
            "object": buildGraphObjectFromSqlResult(unformated_chart_data),
            "message": "Sucesso ao gerar gráfico",
            "success": True
        }
    except:
        return {"message": "Erro ao selecionar dados para gerar gráfico!", "success": False}


def getlogsdetails(ss_id: str):  # ok
    try:
        all_logs = select_command(ab_config,
                                  """SELECT all_logs
																FROM super_survey where ss_id = %s
																limit 1""",
                                  (ss_id,),
                                  "Selecionando detalhes de execução da pesquisa",
                                  "Falha ao selecionar detalhes de execução da pesquisa")

        print(all_logs[0][0])
        return {
            "object": all_logs[0][0] if all_logs[0][0] else "Sem detalhes para exibir",
            "message": "Sucesso ao selecionar detalhes de execução da pesquisa",
            "success": True
        }
    except:
        return {"message": "Erro ao selecionar detalhes de execução da pesquisa!", "success": False}
