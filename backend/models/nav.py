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
    aggregation_method: str
    clusterization_method: str
    platform: str
    room_id: Union[str, None] = None
    host_id: Union[str, None] = None
    price: Union[float, None] = None
    name: Union[str, None] = None
    latitude: Union[str, None] = None
    longitude: Union[str, None] = None
    property_type: Union[List[str], None] = None
    room_type: Union[List[str], None] = None
    minstay: Union[int, None] = None
    reviews: Union[float, None] = None
    accommodates: Union[int, None] = None
    bedrooms: Union[str, None] = None
    bathrooms: Union[str, None] = None
    bathroom: Union[str, None] = None
    extra_host_languages: Union[str, None] = None
    is_superhost: Union[str, None] = None
    comodities: Union[str, None] = None
    route: Union[List[str], None] = None
    sublocality: Union[List[str], None] = None
    locality: Union[List[str], None] = None
    avg_rating: Union[float, None] = None
    location_id: Union[List[int], None] = None
    ss_id: Union[str, None] = None
    city: Union[str, None] = None
    status: Union[str, None] = None
    logs: Union[str, None] = None
    date: Union[str, None] = None

    n_clusters: Union[int, None] = None
    init: Union[str, None] = None
    n_init: Union[int, None] = None
    eps: Union[float, None] = None
    min_samples: Union[int, None] = None
    threshold: Union[float, None] = None
    branching_factor: Union[int, None] = None


class PrepareModel(BaseModel):
    ss_id: str


class ChartModel(BaseModel):
    ss_id: str
    str_column: str
    number_column: str
    aggregation_method: str
