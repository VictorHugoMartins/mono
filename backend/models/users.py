from pydantic import BaseModel


class ChangePermissionModel(BaseModel):
    permission: str
    user_id: str


class DeleteModel(BaseModel):
    user_id: str


class AcceptModel(BaseModel):
    user_id: str
