from threading import Thread
import sys
import scrap.search as search
from config.general_config import ABConfig
import asyncio

ab_config = ABConfig()


class Th(Thread):
    def __init__(self, num, data, ss_id):
        sys.stdout.write("Starting super survey " + str(ss_id))
        sys.stdout.flush()
        Thread.__init__(self)

        self.num = num
        self.platform = data.platform
        self.search_area_name = data.city
        self.user_id = data.user_id
        self.columns = data.columns
        self.clusterization_method = data.clusterization_method
        self.aggregation_method = data.aggregation_method
        self.start_date = data.start_date
        self.finish_date = data.finish_date
        self.include_locality_search = data.include_locality_search
        self.include_route_search = data.include_route_search
        self.ss_id = ss_id

    async def run(self):
        return search.full_process(platform=self.platform,
                            search_area_name=self.search_area_name,
                            user_id=self.user_id,
                            columns=self.columns,
                            start_date=self.start_date,
                            finish_date=self.finish_date,
                            include_locality_search=(
                                (self.include_locality_search == 'true') or self.include_locality_search),
                            include_route_search=(
                                (self.include_route_search == 'true') or self.include_route_search),
                            super_survey_id=self.ss_id,
                            )

# loop = asyncio.get_event_loop()
# loop.run_until_complete(Th())
# loop.close()
