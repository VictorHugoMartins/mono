from pydantic import BaseModel


class ChangePermissionModel(BaseModel):
    permission: str
    user_id: int


class DeleteModel(BaseModel):
    user_id: int


class AcceptModel(BaseModel):
    user_id: int
