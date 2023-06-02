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
    print(self.platform,
        self.search_area_name,
        self.user_id,
        self.columns,
        self.clusterization_method,
        self.aggregation_method,
        self.fill_airbnb_with_selenium,
        self.start_date,
        self.finish_date,
        self.include_locality_search,
        self.include_route_search,
        self.ss_id,
    )
    
    return search.full_process(config=ab_config,
        platform=self.platform[0],
        search_area_name=self.search_area_name[0],
        user_id=self.user_id[0],
        columns=self.columns[0],
        clusterization_method=self.clusterization_method[0],
        aggregation_method=self.aggregation_method[0],
        fill_airbnb_with_selenium=self.fill_airbnb_with_selenium[0],
        start_date=self.start_date[0],
        finish_date=self.finish_date[0],
        include_locality_search=((self.include_locality_search[0] == 'true') or self.include_locality_search[0]),
        include_route_search=((self.include_route_search[0] == 'true') or self.include_route_search[0]),
        super_survey_id=self.ss_id[0],
    )