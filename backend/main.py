import controllers.nav as nav
import controllers.users as users
import controllers.auth as auth
import controllers.super_survey as super_survey

from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from typing import Union, List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post('/super_survey/save')
async def save(data: super_survey.SaveModel):
    print(data)
    print(data.platform)
    print(data.city)
    return super_survey.save(data)


class SuperSurveyContinue(BaseModel):
    ss_id: str


@app.post('/super_survey/continue')
async def restart(data: SuperSurveyContinue):
    print(data)
    return super_survey.restart(data)


class SuperSurveyUpdate(BaseModel):
    ss_id: str
    newStatus: str


@app.post('/super_survey/update')
async def update(data: SuperSurveyUpdate):
    print(data)
    return super_survey.update(data)


@app.get('/super_survey/get_data_columns/{platform}')
async def get_data_columns(platform: str):
    return super_survey.get_data_columns(platform)


class NavExport(BaseModel):
    ss_id: str


@app.post('/nav/export')
async def export_super_survey(data: NavExport):
    return nav.export(data)


class NavList(BaseModel):
    user_id: str


@app.post('/nav/list')
async def export_super_survey_info(data: NavList):
    return nav.list(data)


@app.post('/nav/public_getall')
async def export_public_super_survey_info():
    return nav.public_getall()


class NavGetByCity(BaseModel):
    city: str


@app.post('/nav/getbycity')
async def getbycity(data: NavGetByCity):
    return nav.getbycity(data)


class NavGetById(BaseModel):
    ss_id: str
    platform: str
    city: str
    user_id: str
    columns: List[str]
    clusterization_method: Union[str, None] = None
    agg_method: Union[str, None] = None


@app.post('/nav/getbyid')
async def getbyid(data: NavGetById):
    return super_survey.getbyid(data)


class NavPrepare(BaseModel):
    ss_id: str


@app.post('/nav/prepare')
async def prepare(data: NavPrepare):
    return super_survey.prepare(data)


@app.get('/nav/preparefilter/{ss_id}')
async def prepare_filter(ss_id: str):
    # args = request.args
    return super_survey.prepare_filter(ss_id)


class NavChart(BaseModel):
    str_column: str
    number_collumn: str
    agg_method: str


@app.post('/nav/chart')
async def chart(data: NavChart):
    return super_survey.chart(data)


class AuthLogin(BaseModel):
    email: str
    password: str


@app.post('/auth/login')
async def login(data: AuthLogin):
    return auth.login(data)


class AuthRegister(BaseModel):
    name: str
    email: str


@app.post('/auth/register')
async def register(data: AuthRegister):
    return auth.register(data)


class AuthEditUser(BaseModel):
    userId: str
    name: str
    email: str


@app.post('/auth/edit_user')
async def edit_user(data: AuthEditUser):
    return auth.edit_user(data)


class AuthChangePassword(BaseModel):
    userId: str
    password: str


@app.post('/auth/change_password')
async def change_password(data: AuthChangePassword):
    return auth.change_password(data)


class AuthForgotPassword(BaseModel):
    email: str
    password: str


@app.post('/auth/forgot_password')
async def forgot_password(data: AuthForgotPassword):
    return auth.forgot_password(data)


@app.post('/users/list')
async def list():
    return users.list()


class UsersChangePermission(BaseModel):
    permission: str
    user_id: str


@app.post('/users/change_permission')
async def change_permission(data: UsersChangePermission):
    return users.change_permission(data)


class UsersDelete(BaseModel):
    user_id: str


@app.post('/users/delete')
async def delete_user(data: UsersDelete):
    return users.delete(data)


class UsersAccept(BaseModel):
    user_id: str


@app.post('/users/accept')
async def accept(data: UsersAccept):
    return users.accept(data)


@app.get("/")
async def root(data):
    return {"message": "Hello World. Welcome to FastAPI!"}
