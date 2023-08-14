from pydantic import BaseModel

from typing import Union, List
from typing import Generic, List, Optional, TypeVar


class ExportModel(BaseModel):
    ss_id: str


class ListModel(BaseModel):
    user_id: str


class GetByCityModel(BaseModel):
    city: str


class GetByIdModel(BaseModel):
    ss_id: str
    agg_method: str
    clusterization_method: str
    platform: str
    room_id: str | None = None
    host_id: str | None = None
    price: float | None = None
    name: str | None = None
    latitude: str | None = None
    longitude: str | None = None
    property_type: List[str] | None = None
    room_type: List[str] | None = None
    minstay: int | None = None
    reviews: float | None = None
    accommodates: int | None = None
    bedrooms: str | None = None
    bathrooms: str | None = None
    bathroom: str | None = None
    extra_host_languages: str | None = None
    is_superhost: str | None = None
    comodities: str | None = None
    route: List[str] | None = None
    sublocality: List[str] | None = None
    locality: List[str] | None = None
    avg_rating: float | None = None
    location_id: List[str] | None = None
    ss_id: str | None = None
    city: str | None = None
    status: str | None = None
    logs: str | None = None
    date: str | None = None

    n_clusters: int | None = None
    init: str | None = None
    n_init: int | None = None
    eps: float | None = None
    min_samples: int | None = None
    threshold: float | None = None
    branching_factor: int | None = None


class PrepareModel(BaseModel):
    ss_id: str


class ChartModel(BaseModel):
    str_column: str
    number_collumn: str
    agg_method: str
