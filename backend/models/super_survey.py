from pydantic import BaseModel

from typing import Union, List


class StartModel(BaseModel):
    platform: str
    city: str
    user_id: str
    columns: List[str]
    clusterization_method: Union[str, None] = None
    agg_method: Union[str, None] = None
    start_date: Union[str, None] = None
    finish_date: Union[str, None] = None
    include_locality_search: bool
    include_route_search: bool


class RestartModel(BaseModel):
    ss_id: int


class UpdateModel(BaseModel):
    ss_id: int
    newStatus: int
