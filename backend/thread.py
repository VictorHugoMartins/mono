from threading import Thread
import sys
import search
from general_config import ABConfig
from utils import send_nullable_value
import logging

ab_config = ABConfig()

COUNTDOWN = 5

class Th(Thread):
  def __init__ (self, num, data, ss_id):
    sys.stdout.write("Making thread number " + str(num) + "n")
    sys.stdout.flush()
    Thread.__init__(self)

    self.num = num
    self.function = function
    self.config=ab_config,
    self.platform=send_nullable_value(data, "platform"),
    self.search_area_name=send_nullable_value(data, "city"),
    self.user_id=send_nullable_value(data, "user_id"),
    self.columns=send_nullable_value(data, "columns"),
    self.clusterization_method=send_nullable_value(data, "clusterization_method"),
    self.aggregation_method=send_nullable_value(data, "aggregation_method"),
    self.fill_airbnb_with_selenium=send_nullable_value(data, "platform") == "Airbnb",
    self.start_date=send_nullable_value(data, "start_date"),
    self.finish_date=send_nullable_value(data, "finish_date"),
    self.include_locality_search=send_nullable_value(data, "include_locality_search"),
    self.include_route_search=send_nullable_value(data, "include_route_search"),
    self.ss_id = ss_id,
    self.countdown = COUNTDOWN

  def run(self):
    return search.full_process(config=ab_config,
        platform=self.platform,
        search_area_name=self.city,
        user_id=self.user_id,
        columns=self.columns,
        clusterization_method=self.clusterization_method,
        aggregation_method=self.aggregation_method,
        fill_airbnb_with_selenium=self.platform=="Airbnb",
        start_date=self.start_date,
        finish_date=self.finish_date,
        include_locality_search=self.include_locality_search,
        include_route_search=self.include_route_search,
        super_survey_id=self.ss_id,
    )