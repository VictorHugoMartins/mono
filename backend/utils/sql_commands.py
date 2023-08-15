import logging
from config.general_config import ABConfig

logging = logging.getLogger()


def select_command(config=ABConfig(), sql_script=None, params=None, initial_message=None, failure_message=None):
    try:
        print(sql_script, (params))
        logging.info(initial_message)
        conn = config.connect()
        cur = conn.cursor()

        cur.execute(sql_script, (params))

        return cur.fetchall()
    except Exception:
        logging.error(failure_message)
        return None
    finally:
        try:
            cur.close()
        except:
            pass


def delete_command(config, sql_script, params, initial_message, failure_message):
    try:
        rowcount = -1
        logging.info(initial_message)
        conn = config.connect()
        cur = conn.cursor()

        cur.execute(sql_script, params)
        rowcount = cur.rowcount
        conn.commit()

        return rowcount > -1
    except Exception:
        logging.error(failure_message)
        raise
    finally:
        cur.close()
        return rowcount > -1


def update_command(config, sql_script, params, initial_message, failure_message):
    try:
        id = None
        logging.info(initial_message)
        conn = config.connect()
        cur = conn.cursor()

        cur.execute(sql_script, params)
        conn.commit()

        id = cur.fetchone()[0]
    except Exception:
        logging.error(failure_message)
        raise
    finally:
        cur.close()
        return id


def insert_command(config, sql_script, params, initial_message, failure_message):
    try:
        id = None
        logging.info(initial_message)
        conn = config.connect()
        cur = conn.cursor()

        sql = sql_script
        cur.execute(sql, params)
        conn.commit()

        id = cur.fetchone()[0]

        return id
    except Exception as e:
        print(e)
        logging.error(failure_message)
        conn.rollback()
        cur.close()
        return None