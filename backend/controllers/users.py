from flask import jsonify
from config.general_config import ABConfig
from utils.file_manager import export_datatable
from utils.functions import update_command, delete_command
from utils.functions import get_random_string
from utils.mail import send_mail

ab_config = ABConfig()


def list(data):  # ok
    try:
        users = export_datatable(ab_config, """
											select
														user_id,
														name,
														email,
														permission,
															case
																when password is not null
																	then 'y'
																	else null
																end
														as password
													from users
                          order by user_id desc
											""", None, None, True)
        response = jsonify({
            "object": users,
            "message": "Dados retornados com sucesso!",
            "success": True
        })
        # response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    finally:
        return jsonify({"message": "Falha ao iniciar pesquisa", "success": False}), 500


def change_permission(data):
    try:
        user_id = update_command(ab_config,
                                 sql_script="""
                              UPDATE users set permission = %s where user_id = %s returning user_id""",
                                 params=(
                                     (data["permission"], data['user_id'])),
                                 initial_message="Atualizando permissão do usuario...",
                                 failure_message="Falha ao atualizar permissão do usuário")
        if (user_id):
            response = jsonify({
                "object": user_id,
                "message": "Dados retornados com sucesso!",
                "success": True
            })
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
    finally:
        return jsonify({"message": "Falha ao iniciar pesquisa", "success": False}), 500


def delete(data):  # ok
    try:
        removed = delete_command(ab_config,
                                 sql_script="""DELETE from users where user_id = %s""",
                                 params=((data['user_id'],)),
                                 initial_message="Deletando usuario...",
                                 failure_message="Falha ao deletar usuário")
        if (removed):
            response = jsonify({
                "object": None,
                "message": "Usuário removido com sucesso!",
                "success": True
            })
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
    except:
        return jsonify({"message": "Falha ao iniciar pesquisa", "success": False}), 500


def accept(data):  # erro no send mail
    try:
        password = get_random_string(10)
        email = update_command(ab_config,
                               sql_script="""UPDATE users set password = %s where user_id = %s returning email""",
                               params=((password, data['user_id'])),
                               initial_message="Aceitando solicitação de acesso do usuario...",
                               failure_message="Falha ao aceitar solicitação de acesso")
        if (email):
            send_mail(email)
            response = jsonify({
                "object": None,
                "message": "Acesso aceito com sucesso!",
                "success": True
            })
            # response.headers.add('Access-Control-Allow-Origin', '*')
            return response
    except:
        return jsonify({"message": "Falha ao iniciar pesquisa", "success": False}), 500
