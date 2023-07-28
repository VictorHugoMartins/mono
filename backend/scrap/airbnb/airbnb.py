import logging
import argparse
import sys
from config.general_config import ABConfig
from scrap.airbnb.airbnb_survey import ABSurveyByBoundingBox

def db_add_survey(config, search_area):
		"""
		Add a survey entry to the database, so the survey can be run.
		Also returns the survey_id, in case it is to be used..
		"""

		# POSTGRESQL
		try:
				conn = config.connect()
				cur = conn.cursor()
				# Add an entry into the survey table, and get the survey_id
				sql = """
				insert into survey (survey_description, search_area_id)
				select (name || ' (' || current_date || ')') as survey_description,
				search_area_id
				from search_area
				where name = %s
				returning survey_id"""
				cur.execute(sql, (search_area,))
				survey_id = cur.fetchone()[0]

				# Get and print the survey entry
				cur.execute("""select survey_id, survey_date,
				survey_description, search_area_id
				from survey where survey_id = %s""", (survey_id,))
				(survey_id,
				 survey_date,
				 survey_description,
				 search_area_id) = cur.fetchone()
				conn.commit()
				cur.close()
				print("\nSurvey added:\n"
							+ "\n\tsurvey_id=" + str(survey_id)
							+ "\n\tsurvey_date=" + str(survey_date)
							+ "\n\tsurvey_description=" + survey_description
							+ "\n\tsearch_area_id=" + str(search_area_id))
				return survey_id
		except Exception:
				logging.error("Failed to add survey for %s", search_area)
				raise

def parse_args():
		"""
		Read and parse command-line arguments
		"""
		parser = argparse.ArgumentParser(
				description='Manage a database of Airbnb listings.',
				usage='%(prog)s [options]')
		parser.add_argument("-v", "--verbose",
												action="store_true", default=False,
												help="""write verbose (debug) output to the log file""")
		parser.add_argument("-c", "--config_file",
												metavar="config_file", action="store", default=None,
												help="""explicitly set configuration file, instead of
												using the default <username>.config""")
		# Only one argument!
		group = parser.add_mutually_exclusive_group()
		group.add_argument('-?', action='help')

		args = parser.parse_args()
		return (parser, args)


def main():
		"""
		Main entry point for the program.
		"""
		(parser, args) = parse_args()
		logging.basicConfig(
				format='%(levelname)-8s%(message)s', level=logging.INFO)
		ab_config = ABConfig(args)
		
		try:
				if args.add_and_search_by_bounding_box:
						survey_id = db_add_survey(ab_config,
																			args.add_and_search_by_bounding_box)
						survey = ABSurveyByBoundingBox(ab_config, survey_id)
						survey.search(ab_config.FLAGS_ADD)
				else:
						parser.print_help()
		except (SystemExit, KeyboardInterrupt):
				sys.exit()
		except Exception:
				logging.exception("Top level exception handler: quitting.")
				sys.exit(0)


if __name__ == "__main__":
		main()