from pydantic import BaseModel


class LoginModel(BaseModel):
    email: str
    password: str


class RegisterModel(BaseModel):
    name: str
    email: str


class EditUserModel(BaseModel):
    userId: str
    name: str
    email: str


class ChangePasswordModel(BaseModel):
    userId: str
    password: str


class ForgotPasswordModel(BaseModel):
    email: str
    password: str
