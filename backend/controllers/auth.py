from utils.sql_commands import select_command, insert_command, update_command
import psycopg2

from models.auth import *


def login(data: LoginModel):  # ok
    try:
        user_data = select_command(sql_script="SELECT user_id, name, email, permission from users where email = %s and password = %s limit 1",
                                   params=(
                                       (data.email, data.password)),
                                   initial_message="Autenticando usuario...",
                                   failure_message="Falha ao realizar login")
        print(user_data)
        if user_data[0][2] == data.email:
            print("é igual!")
            print(user_data[0][0])
            print(user_data[0][1])
            print(user_data[0][2])
            print(user_data[0][3])
            return {
                "object": {
                    "user_id": user_data[0][0],
                    "name": user_data[0][1],
                    "email": user_data[0][2],
                    "permission": user_data[0][3]
                },
                "message": "Sucesso ao realizar login",
                "success": True
            }
        else:
            return {"message": "Tente novamente!", "success": False}
    except:
        return {"message": "Erro ao realizar login!", "success": False}


def register(data: RegisterModel):
    try:
        result = select_command(sql_script="""SELECT user_id from users where email = %s
																	limit 1""",
                                params=((data.email,)),
                                initial_message="Verificando existência de usuário...",
                                failure_message="Falha ao verificar existência de usuário")
        if result:
            return {"message": "E-mail já cadastrado!", "success": False}
        else:
            user_data = insert_command(sql_script="""INSERT INTO users(name, email) values(%s, %s) returning user_id""",
                                       params=(
                                           (data.name, data.email)),
                                       initial_message="Autenticando usuario...",
                                       failure_message="Falha ao cadastrar usuário")
            if user_data:
                return {
                    "object": {
                        "user_id": user_data,
                        "name": data.name,
                        "email": data.email
                    },
                    "message": "Sucesso ao cadastrar usuário",
                    "success": True
                }
            else:
                return {"message": "Erro ao cadastrar usuário!", "success": False}
    except psycopg2.errors.UniqueViolation:
        return {"message": "Usuário já cadastrado! Talvez seja melhor tentar fazer login...", "success": False}
    except:
        return {"message": "Exceção ao cadastrar usuário!", "success": False}


def edit_user(data: EditUserModel):
    try:
        user_data = update_command(sql_script="""UPDATE users set name = %s, email = %s where user_id = %s returning user_id""",
                                   params=(
                                       (data.name, data.email, data.userId)),
                                   initial_message="Atualizando dados do usuario...",
                                   failure_message="Falha ao atualizar dados do usuário")
        if user_data:
            return {
                "object": {
                    "user_id": data.userId,
                    "name": data.name,
                    "email": data.email
                },
                "message": "Sucesso ao atualizar dados do usuário",
                "success": True
            }
        else:
            return {"message": "Erro ao atualizar dados do usuário!", "success": False}
    except:
        return {"message": "Erro ao cadastrar usuário!", "success": False}


def change_password(data: ChangePasswordModel):  # ok
    try:
        user_data = insert_command(sql_script="""UPDATE users set password = %s where user_id = %s returning user_id""",
                                   params=((data.password, data.userId)),
                                   initial_message="Atualizando senha do usuário...",
                                   failure_message="Falha ao atualizar senha do usuário")
        if user_data:
            return {
                "object": None,
                "message": "Sucesso ao atualizar senha do usuário",
                "success": True
            }
        else:
            return {"message": "Erro ao atualizar senha do usuário!", "success": False}
    except:
        return {"message": "Erro ao atualizar senha do usuário!", "success": False}


def forgot_password(data: ForgotPasswordModel):  # ok
    try:
        user_data = insert_command(sql_script="""UPDATE users set password = %s where email = %s returning user_id""",
                                   params=((data.password, data.email)),
                                   initial_message="Atualizando senha do usuário...",
                                   failure_message="Falha ao atualizar senha do usuário")
        if user_data:
            return {
                "object": None,
                "message": "Sucesso ao atualizar senha do usuário",
                "success": True
            }
        else:
            return {"message": "Erro ao atualizar senha do usuário!", "success": False}
    except:
        return {"message": "Erro ao atualizar senha do usuário!", "success": False}
