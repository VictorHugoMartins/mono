#!/usr/bin/python3
# ============================================================================
# Tom Slee, 2013--2017.
#
# An ABListing represents and individual Airbnb listing
# ============================================================================
import logging
import psycopg2

from scrap.geocoding import reverse_geocode_coordinates_and_insert
from utils.sql_commands import insert_command

logger = logging.getLogger()


class ABListing():
    """
    # ABListing represents an Airbnb room_id, as captured at a moment in time.
    # room_id, survey_id is the primary key.
    # Occasionally, a survey_id = None will happen, but for retrieving data
    # straight from the web site, and not stored in the database.
    """

    def __init__(self, config, room_id, survey_id):
        self.config = config
        self.room_id = room_id
        self.host_id = None
        self.room_type = None
        self.country = None
        self.city = None
        self.address = None
        self.reviews = None
        self.reviews_text = False
        self.overall_satisfaction = None
        self.accommodates = None
        self.bedrooms = None
        self.bathrooms = None
        self.price = None
        self.deleted = None
        self.minstay = None
        self.latitude = None
        self.longitude = None
        self.survey_id = survey_id
        #  extra fields added from search json:
        # coworker_hosted (bool)
        self.coworker_hosted = None
        # extra_host_languages (list)
        self.extra_host_languages = None
        # name (str)
        self.name = None
        # property_type (str)
        self.property_type = None
        # currency (str)
        self.currency = None
        # rate_type (str) - "nightly" or other?
        self.rate_type = None
        self.sublocality = None
        self.route = None
        self.is_superhost = None
        self.max_nights = None
        self.avg_rating = None
        self.person_capacity = None
        self.pictures = None
        self.bathroom = None
        self.location_id = None

        logger.setLevel(config.log_level)

    def save_as_deleted(self):
        try:
            logger.debug("Marking room deleted: " + str(self.room_id))
            if self.survey_id is None:
                return
            conn = self.config.connect()
            sql = """
                update room
                set deleted = 1, last_modified = now()::timestamp
                where room_id = %s
                and survey_id = %s
            """
            cur = conn.cursor()
            cur.execute(sql, (self.room_id, self.survey_id))
            cur.close()
            conn.commit()
        except Exception:
            logger.error("Failed to save room as deleted")
            raise

    def save(self, insert_replace_flag):
        """
        Save a listing in the database. Delegates to lower-level methods
        to do the actual database operations.
        Return values:
            True: listing is saved in the database
            False: listing already existed
        """
        try:
            rowcount = -1
            if self.deleted == 1:
                self.save_as_deleted()
            else:
                '''if insert_replace_flag == self.config.FLAGS_INSERT_REPLACE:
                    rowcount = self.__update()
                '''
                if (rowcount == 0 or
                        insert_replace_flag == self.config.FLAGS_INSERT_NO_REPLACE):
                    try:
                        if (self.config.FLAGS_INSERT_IN_LOCATION):
                            for i in range(self.config.ATTEMPTS_TO_FIND_PAGE):
                                try:
                                    self.location_id = reverse_geocode_coordinates_and_insert(
                                        self.config, self.latitude, self.longitude)
                                    break
                                except:
                                    pass
                        self.__insert()
                        return True
                    except psycopg2.IntegrityError:
                        logger.debug("Room " + str(self.room_id) +
                                     ": already collected")
                        return False
        except psycopg2.OperationalError:
            # connection closed
            logger.error("Operational error (connection closed): resuming")
            del (self.config.connection)
        except psycopg2.DatabaseError as de:
            self.config.connection.conn.rollback()
            logger.erro(psycopg2.errorcodes.lookup(de.pgcode[:2]))
            logger.error("Database error: resuming")
            del (self.config.connection)
        except psycopg2.InterfaceError:
            # connection closed
            logger.error("Interface error: resuming")
            del (self.config.connection)
        except psycopg2.Error as pge:
            # database error: rollback operations and resume
            self.config.connection.conn.rollback()
            logger.error("Database error: " + str(self.room_id))
            logger.error("Diagnostics " + pge.diag.message_primary)
            del (self.config.connection)
        except (KeyboardInterrupt, SystemExit):
            raise
        except UnicodeEncodeError as uee:
            logger.error("UnicodeEncodeError Exception at " +
                         str(uee.object[uee.start:uee.end]))
            raise
        except ValueError:
            logger.error("ValueError for room_id = " + str(self.room_id))
        except AttributeError:
            logger.error("AttributeError")
            raise
        except Exception:
            self.config.connection.rollback()
            logger.error("Exception saving room")
            raise

    def __insert(self):
        """ Insert a room into the database. Raise an error if it fails """
        return insert_command(sql_script="""
                                  insert into room (
                                      room_id, host_id, room_type, country, city,
                                      address, reviews, overall_satisfaction,
                                      accommodates, bedrooms, bathrooms, price, deleted,
                                      minstay, latitude, longitude, survey_id,
                                      coworker_hosted, extra_host_languages, name,
                                      property_type, currency, rate_type,
                                      sublocality, route, avg_rating,
                                      is_superhost, bathroom, location_id)
                                  values (%s, %s, %s, %s, %s, %s, %s, %s, %s,
                                  %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
                                  %s, %s, %s, %s, %s, %s, %s, %s, %s
                                  ) returning room_id""",
                              params=(
                                  (
                                      self.room_id, self.host_id, self.room_type, self.country,
                                      self.city, self.address, self.reviews,
                                      self.overall_satisfaction, self.accommodates, self.bedrooms,
                                      self.bathrooms, self.price, self.deleted, self.minstay,
                                      self.latitude, self.longitude, self.survey_id,
                                      self.coworker_hosted, self.extra_host_languages, self.name,
                                      self.property_type, self.currency, self.rate_type,
                                      self.sublocality, self.route, self.avg_rating,
                                      self.is_superhost, self.bathroom,
                                      self.location_id
                                  )),
                              initial_message="Inserindo Acomodação {r} do Airbnb...".format(
                                  r=self.room_id),
                              failure_message="Falha ao inserir Acomodação {r} do Airbnb...".format(r=self.room_id))

# colunas para remover: sublocality, route, max_nights, pictures
