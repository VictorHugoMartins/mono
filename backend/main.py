from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

# controllers
import controllers.super_survey as super_survey
import controllers.auth as auth
import controllers.users as users
import controllers.nav as nav

app = Flask(__name__)  # Dados de usuário armazenados em um dicionário
CORS(app)


@app.route('/super_survey/save', methods=['POST'])
@cross_origin()
def save():
    data = request.get_json()
    return super_survey.save(data)


@app.route('/super_survey/continue', methods=['POST'])
@cross_origin()
def restart():
    data = request.get_json()
    return super_survey.restart(data)


@app.route('/super_survey/get_data_columns', methods=['GET'])
@cross_origin()
def get_data_columns():
    args = request.args
    return super_survey.get_data_columns(args)


@app.route('/nav/export', methods=['POST'])
@cross_origin()
def export_super_survey():
    data = request.get_json()
    return nav.export(data)


@app.route('/nav/list', methods=['POST'])
@cross_origin()
def export_super_survey_info():
    data = request.get_json()
    return nav.list(data)


@app.route('/nav/public_getall', methods=['POST'])
@cross_origin()
def export_public_super_survey_info():
    data = request.get_json()
    print(data)
    return nav.public_getall(data)


@app.route('/nav/getbycity', methods=['POST'])
@cross_origin()
def getbycity():
    data = request.get_json()
    return nav.getbycity(data)


@app.route('/nav/getbyid', methods=['POST'])
@cross_origin()
def getbyid():
    data = request.get_json()
    return super_survey.getbyid(data)


@app.route('/nav/prepare', methods=['POST'])
@cross_origin()
def prepare():
    data = request.get_json()
    return super_survey.prepare(data)


@app.route('/nav/preparefilter', methods=['GET'])
@cross_origin()
def prepare_filter():
    args = request.args
    return super_survey.prepare_filter(args)


@app.route('/nav/chart', methods=['POST'])
@cross_origin()
def chart():
    data = request.get_json()
    return super_survey.chart(data)


@app.route('/auth/login', methods=['POST'])
@cross_origin()
def login():
    data = request.get_json()
    return auth.login(data)


@app.route('/auth/register', methods=['POST'])
@cross_origin()
def register():
    data = request.get_json()
    return auth.register(data)


@app.route('/auth/edit_user', methods=['POST'])
@cross_origin()
def edit_user():
    data = request.get_json()
    return auth.edit_user(data)


@app.route('/auth/change_password', methods=['POST'])
@cross_origin()
def change_password():
    data = request.get_json()
    return auth.change_password(data)


@app.route('/auth/forgot_password', methods=['POST'])
@cross_origin()
def forgot_password():
    data = request.get_json()
    return auth.forgot_password(data)


@app.route('/users/list', methods=['POST'])
@cross_origin()
def list():
    data = request.get_json()
    return users.list(data)


@app.route('/users/change_permission', methods=['POST'])
@cross_origin()
def change_permission():
    data = request.get_json()
    return users.change_permission(data)


@app.route('/users/delete', methods=['POST'])
@cross_origin()
def delete_user():
    data = request.get_json()
    return users.delete(data)


@app.route('/users/accept', methods=['POST'])
@cross_origin()
def accept():
    data = request.get_json()
    return users.accept(data)


@app.route('/', methods=['GET'])
@cross_origin()
def hello_world():
    try:
        return "Hello World"
    except:
        return jsonify({"message": "Erro!", "success": False}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
