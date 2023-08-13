from flask import jsonify
from config.general_config import ABConfig
from utils.file_manager import export_datatable
from utils.general_dict import get_all_rooms_by_ss_id

ab_config = ABConfig()


def export(data):  # ok
    try:
        response = jsonify({
            "object": export_datatable(ab_config, get_all_rooms_by_ss_id(data["ss_id"]), None, "Airbnb", True),
            "message": "Dados retornados com sucesso!",
            "success": True
        })

        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except:
        return jsonify({"message": "Falha ao exportar dados", "success": False}), 500


def list(data):  # ok
    try:
        print("nesse")
        response = jsonify({
            "object": export_datatable(ab_config, """SELECT ss_id, city, status, logs, date FROM super_survey WHERE user_id = %s ORDER BY ss_id desc""", (data['user_id'],), "Airbnb", True),
            "message": "Dados retornados com sucesso!",
            "success": True
        })
        # response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except KeyError:
        response = jsonify(
            {"message": "Faça login!", "success": False, "status": 401}), 401
        return response
    except:
        return jsonify({"message": "Falha ao buscar dados", "success": False}), 500


def public_getall():  # ok
    try:
        response = jsonify({
            "object": export_datatable(ab_config, """
													select distinct(city), count(city) as survey_qtd, max(date) as last_updated from super_survey where city is not null group by city order by last_updated desc
												""", None, None, True),
            "message": "Dados retornados com sucesso!",
            "success": True
        })
        print("o response: ", response)
        # response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except KeyError:
        response = jsonify(
            {"message": "Faça login!", "success": False, "status": 401}), 401
        return response
    except:
        return jsonify({"message": "Falha ao buscar dados!", "success": False}), 500


def getbycity(data):  # ok
    try:
        response = jsonify({
            "object": export_datatable(ab_config, """
											select ss_id, date, logs from super_survey where city = %s
										""", (data['city'],), None, True),
            "message": "Dados retornados com sucesso!",
            "success": True
        })
        print(response)
        # response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except:
        response = jsonify({"message": "Falha ao buscar pesquisas!",
                            "success": False, "status": 500}), 500  # Inicia a aplicação
        return response
