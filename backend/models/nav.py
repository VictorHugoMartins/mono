from pydantic import BaseModel

from typing import Union, List


class ExportModel(BaseModel):
    ss_id: str


class ListModel(BaseModel):
    user_id: str


class GetByCityModel(BaseModel):
    city: str


class GetByIdModel(BaseModel):
    ss_id: str
    platform: str
    city: str
    user_id: str
    columns: List[str]
    clusterization_method: Union[str, None] = None
    agg_method: Union[str, None] = None


class PrepareModel(BaseModel):
    ss_id: str


class ChartModel(BaseModel):
    str_column: str
    number_collumn: str
    agg_method: str
