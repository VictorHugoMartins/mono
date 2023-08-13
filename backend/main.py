import controllers.nav as nav
import controllers.users as users
import controllers.auth as auth
import controllers.super_survey as super_survey

from fastapi import FastAPI, BackgroundTasks, HTTPException
from pydantic import BaseModel

app = FastAPI()


@app.post('/super_survey/save')
# @cross_origin(data)
async def save(data):
    # data = request.get_json(data)
    return super_survey.save(data)


@app.post('/super_survey/continue')
# @cross_origin(data)
async def restart(data):
    # data = request.get_json(data)
    return super_survey.restart(data)


@app.post('/super_survey/update')
# @cross_origin(data)
async def update(data):
    # data = request.get_json(data)
    return super_survey.update(data)


class SuperSurveyGetDataColumns(BaseModel):
    platform: str


@app.get('/super_survey/get_data_columns/{platform}')
async def get_data_columns(platform: str):
    return super_survey.get_data_columns(platform)


@app.post('/nav/export')
# @cross_origin(data)
async def export_super_survey(data):
    # data = request.get_json(data)
    return nav.export(data)


class NavList(BaseModel):
    user_id: str


@app.post('/nav/list')
async def export_super_survey_info(data: NavList):
    # data = request.get_json(data)
    return nav.list(data)


@app.post('/nav/public_getall')
# @cross_origin(data)
async def export_public_super_survey_info():
    return nav.public_getall()


@app.post('/nav/getbycity')
# @cross_origin(data)
async def getbycity(data):
    # data = request.get_json(data)
    return nav.getbycity(data)


@app.post('/nav/getbyid')
# @cross_origin(data)
async def getbyid(data):
    # data = request.get_json(data)
    return super_survey.getbyid(data)


@app.post('/nav/prepare')
# @cross_origin(data)
async def prepare(data):
    # data = request.get_json(data)
    return super_survey.prepare(data)


@app.get('/nav/preparefilter')
# @cross_origin(data)
async def prepare_filter(data):
    # args = request.args
    return super_survey.prepare_filter(data)


@app.post('/nav/chart')
# @cross_origin(data)
async def chart(data):
    # data = request.get_json(data)
    return super_survey.chart(data)


@app.post('/auth/login')
# @cross_origin(data)
async def login(data):
    # data = request.get_json(data)
    return auth.login(data)


@app.post('/auth/register')
# @cross_origin(data)
async def register(data):
    # data = request.get_json(data)
    return auth.register(data)


@app.post('/auth/edit_user')
# @cross_origin(data)
async def edit_user(data):
    # data = request.get_json(data)
    return auth.edit_user(data)


@app.post('/auth/change_password')
# @cross_origin(data)
async def change_password(data):
    # data = request.get_json(data)
    return auth.change_password(data)


@app.post('/auth/forgot_password')
# @cross_origin(data)
async def forgot_password(data):
    # data = request.get_json(data)
    return auth.forgot_password(data)


@app.post('/users/list')
# @cross_origin(data)
async def list(data):
    # data = request.get_json(data)
    return users.list(data)


@app.post('/users/change_permission')
# @cross_origin(data)
async def change_permission(data):
    # data = request.get_json(data)
    return users.change_permission(data)


@app.post('/users/delete')
# @cross_origin(data)
async def delete_user(data):
    # data = request.get_json(data)
    return users.delete(data)


@app.post('/users/accept')
# @cross_origin(data)
async def accept(data):
    # data = request.get_json(data)
    return users.accept(data)


@app.get("/")
async def root(data):
    return {"message": "Hello World. Welcome to FastAPI!"}
