from pydantic import BaseModel

from typing import Union, List


class SaveModel(BaseModel):
    platform: str
    city: str
    user_id: str
    columns: List[str]
    clusterization_method: Union[str, None] = None
    aggregation_method: Union[str, None] = None
    start_date: Union[str, None] = None
    finish_date: Union[str, None] = None
    include_locality_search: bool
    include_route_search: bool


class RestartModel(BaseModel):
    ss_id: str


class UpdateModel(BaseModel):
    ss_id: str
    newStatus: str
