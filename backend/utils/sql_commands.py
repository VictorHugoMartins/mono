import psycopg2
import logging
from config.general_config import ABConfig

logging = logging.getLogger()


def select_command(config=ABConfig(), sql_script=None, params=None, initial_message=None, failure_message=None):
    try:
        logging.info(initial_message)

        print("na linha 12")
        conn = config.connect()
        cur = conn.cursor()

        print("na linha 16")

        cur.execute(sql_script, (params))

        results = cur.fetchall()
        print(results)
        return results
    except Exception as e:
        print(sql_script, params)
        print("no select exception:", e)
        logging.error(failure_message)
        return None
    finally:
        try:
            cur.close()
        except:
            pass


def delete_command(config=ABConfig(), sql_script=None, params=None, initial_message=None, failure_message=None):
    try:
        rowcount = -1
        logging.info(initial_message)
        conn = config.connect()
        cur = conn.cursor()

        cur.execute(sql_script, params)
        rowcount = cur.rowcount
        conn.commit()

        return rowcount > -1
    except Exception as e:
        print(sql_script, params)
        print("no delete: ", e)
        logging.error(failure_message)
        raise
    finally:
        cur.close()
        return rowcount > -1


def update_command(config=ABConfig(), sql_script=None, params=None, initial_message=None, failure_message=None):
    try:
        id = None
        logging.info(initial_message)
        conn = config.connect()
        cur = conn.cursor()

        cur.execute(sql_script, params)
        conn.commit()

        id = cur.fetchone()[0]
    except Exception as e:
        print(sql_script, params)
        print("no update: ", e)
        logging.error(failure_message)
        raise
    finally:
        cur.close()
        return id


def insert_command(config=ABConfig(), sql_script=None, params=None, initial_message=None, failure_message=None):
    try:
        id = None
        logging.info(initial_message)
        conn = config.connect()
        cur = conn.cursor()

        print(sql_script, params)
        cur.execute(sql_script, params)
        conn.commit()

        id = cur.fetchone()[0]

        return id
    except psycopg2.errors.UniqueViolation as e:
        print(sql_script, params)
        logging.info("Register already inserted: ", e)
        conn.rollback()
        cur.close()
        return None
    except psycopg2.errors.NumericValueOutOfRange as e:
        print(sql_script, params)
        logging.error("Numeric value out of range: ", e)
        return None
    except Exception as e:
        print(sql_script, params)
        logging.error("Exception no insert: ", e)
        logging.error(failure_message)
        conn.rollback()
        cur.close()
        return None
    finally:
        try:
            conn.rollback()
            cur.close()
        except:
            pass
