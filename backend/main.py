# from fastapi import FastAPI, BackgroundTasks
# from fastapi.middleware.cors import CORSMiddleware
# import uvicorn

# import scrap.geocoding as geocoding

# import controllers.auth as auth
# import controllers.nav as nav
# import controllers.super_survey as super_survey
# import controllers.users as users

# from models.auth import *
# from models.nav import *
# from models.super_survey import *
# from models.users import *

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=['*'],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# @app.post('/super_survey/start')
# async def start(data: StartModel, background_tasks: BackgroundTasks):
#     return super_survey.start(data, background_tasks)


# @app.post('/super_survey/restart')
# async def restart(data: RestartModel, background_tasks: BackgroundTasks):
#     return super_survey.restart(data, background_tasks)


# @app.post('/super_survey/update')
# async def update(data: UpdateModel):
#     return super_survey.update(data)


# @app.get('/super_survey/get_data_columns/{platform}')
# async def get_data_columns(platform: str):
#     return super_survey.get_data_columns(platform)


# @app.post('/nav/export')
# async def export_super_survey(data: ExportModel):
#     return nav.export(data)


# @app.post('/nav/list')
# async def list_nav(data: ListModel, background_tasks: BackgroundTasks):
#     return nav.list(data)


# @app.post('/nav/public_getall')
# async def public_list_nav():
#     return nav.public_getall()


# @app.get('/system/update_locations/{userId}')
# async def update_locations(userId: str, background_tasks: BackgroundTasks):
#     try:
#         background_tasks.add_task(
#             geocoding.identify_and_update_locations, 'Airbnb')
#         background_tasks.add_task(
#             geocoding.identify_and_update_locations, 'Booking')

#         return {"object": None, "message": "Localizações atualizado com sucesso!", "success": True}
#     except:
#         return {"object": None, "message": "Falha ao atualizar localizações em segundo plano!", "success": False}


# @app.post('/nav/getbycity')
# async def getbycity(data: GetByCityModel):
#     return nav.getbycity(data)


# @app.post('/nav/getbyid')
# async def getbyid(data: GetByIdModel):
#     return nav.getbyid(data)


# @app.post('/nav/prepare')
# async def prepare(data: PrepareModel):
#     return nav.prepare(data)


# @app.get('/nav/preparefilter/{ss_id}')
# async def prepare_filter(ss_id: str):
#     return nav.prepare_filter(ss_id)


# @app.get('/nav/getlogsdetails/{ss_id}')
# async def getlogsdetails(ss_id: str):
#     return nav.getlogsdetails(ss_id)


# @app.post('/nav/chart')
# async def chart(data: ChartModel):
#     return nav.chart(data)


# @app.post('/auth/login')
# async def login(data: LoginModel):
#     return auth.login(data)


# @app.post('/auth/register')
# async def register(data: RegisterModel):
#     return auth.register(data)


# @app.post('/auth/edit_user')
# async def edit_user(data: EditUserModel):
#     return auth.edit_user(data)


# @app.post('/auth/change_password')
# async def change_password(data: ChangePasswordModel):
#     return auth.change_password(data)


# @app.post('/auth/forgot_password')
# async def forgot_password(data: ForgotPasswordModel):
#     return auth.forgot_password(data)


# @app.post('/users/list')
# async def list():
#     return users.list()


# @app.post('/users/change_permission')
# async def change_permission(data: ChangePermissionModel):
#     return users.change_permission(data)


# @app.post('/users/delete')
# async def delete_user(data: DeleteModel):
#     return users.delete(data)


# @app.post('/users/accept')
# async def accept(data: AcceptModel):
#     return users.accept(data)


# @app.get("/")
# async def root():
#     return {"message": "Hello World. Welcome to FastAPI!"}

# if __name__ == "__main__":
#     uvicorn.run("main:app", host="127.0.0.1", port=5000,
#                 log_level="info", reload=True)

# # from config.postgresql.migrate import migrate_structure_changes

# # migrate_structure_changes()

from scrap.geocoding import BoundingBox
from config.general_config import ABConfig
ab_config = ABConfig()

k = BoundingBox.from_geopy(ab_config, "Itabirito, Minas Gerais")
print(k)
