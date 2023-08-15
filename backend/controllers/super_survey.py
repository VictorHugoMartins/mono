from fastapi import BackgroundTasks
from config.general_config import ABConfig
import scrap.search as search
from utils.general_dict import columnDict
from utils.sql_commands import select_command, update_command
from models.super_survey import *

ab_config = ABConfig()


def start(data: StartModel, background_tasks: BackgroundTasks):
    try:
        data.columns.append("room_id", "host_id", "price",
                            "latitude", "longitude")
        ss_id = search.initialize_search(config=ab_config,
                                         platform=data.platform,
                                         search_area_name=data.city,
                                         user_id=data.user_id,
                                         columns=data.columns,
                                         clusterization_method=data.clusterization_method,
                                         aggregation_method=data.aggregation_method,
                                         start_date=data.start_date,
                                         finish_date=data.finish_date,
                                         include_locality_search=data.include_locality_search,
                                         include_route_search=data.include_route_search)

        background_tasks.add_task(search.full_process,
                                  platform=data.platform,
                                  search_area_name=data.city,
                                  user_id=data.user_id,
                                  columns=data.columns,
                                  start_date=data.start_date,
                                  finish_date=data.finish_date,
                                  include_locality_search=(
                                      data.include_locality_search == 'true'),
                                  include_route_search=(
                                      data.include_route_search == 'true'),
                                  super_survey_id=ss_id)

        response = {
            "object": {"super_survey_id": ss_id},
            "message": "Pesquisa cadastrada com sucesso!",
            "success": True
        }

        return response
    except:
        return {"message": "Falha ao iniciar pesquisa", "success": False}


def restart(data: RestartModel, background_tasks: BackgroundTasks):
    try:
        result = select_command(ab_config,
                                """SELECT platform, search_area_name, super_survey_config.user_id, data_columns,
																	clusterization_method, aggregation_method, start_date, finish_date,
																	include_locality_search, include_route_search, status
																	FROM super_survey_config
																	LEFT JOIN super_survey
																	ON super_survey_config.ss_id = super_survey.ss_id
																	where super_survey_config.ss_id = %s limit 1""",
                                (data.ss_id,),
                                "Selecionando dado de configuração de pesquisa",
                                "Falha ao selecionar dados de configurações de pesquisa")
        if not result:
            return {"message": "Falha ao selecionar dados de configurações de pesquisa", "success": False}

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

        try:
            search.update_super_survey_status(ab_config,
                                              data.ss_id,
                                              status=19 if (
                                                  new_params["platform"] != 'Booking') else 719,
                                              logs='Reiniciando busca por ' + new_params["city"])
        except:
            pass
        finally:
            background_tasks.add_task(search.full_process,
                                      platform=new_params["platform"],
                                      search_area_name=new_params["city"],
                                      user_id=new_params["user_id"],
                                      columns=new_params["data_columns"],
                                      start_date=new_params["start_date"],
                                      finish_date=new_params["finish_date"],
                                      include_locality_search=(
                                          new_params["include_locality_search"] == 'true'),
                                      include_route_search=(
                                          new_params["include_route_search"] == 'true'),
                                      super_survey_id=data.ss_id
                                      )

        response = {
            "object": {"super_survey_id": data.ss_id},
            "message": "Pesquisa em andamento!",
            "success": True
        }

        return response
    except:
        return {"message": "Falha ao iniciar pesquisa", "success": False}


def update(data: UpdateModel):  # ok
    try:
        ss_id = update_command(ab_config,
                               sql_script="""update super_survey set status=%s where ss_id = %s returning ss_id""",
                               params=((data.newStatus, data.ss_id)),
                               initial_message="Atualizando status da pesquisa...",
                               failure_message="Falha ao atualizar status da pesquisa")
        if ss_id:
            return {
                "object": None,
                "message": "Sucesso ao atualizar status da pesquisa",
                "success": True
            }
        else:
            return {
                "object": None,
                "message": "Falha ao atualizar status da pesquisa",
                "success": False
            }
    except:
        # Se os dados de login estiverem incorretos, retorna erro 401 - Unauthorized
        return {"message": "Erro ao atualizar status da pesquisa", "success": False}


def get_data_columns(platform: str):  # ok
    try:
        result = []
        for x in columnDict:
            if (platform in columnDict[x]["excludeIn"]):
                continue
            else:
                result.append({"label": columnDict[x]["label"], "value": x})

        return {
            "object": result,
            "message": "Sucesso ao retornar colunas para seleção de dados para coleta",
            "success": True
        }
    except:
        return {"message": "Erro ao retornar colunas para seleção de dados para coleta!", "success": False}
