import time
import logging
import selenium
from selenium.webdriver.common.by import By
from utils.functions import prepare_driver 

logger = logging.getLogger()
DOMAIN = 'https://www.airbnb.com.br/rooms/'


def save_as_deleted(config, room_id):
    try:
        logger.debug("Marking room deleted: " + str(room_id))
        conn = config.connect()
        sql = """
			update room
			set deleted = 1, last_modified = now()::timestamp
			where room_id = %s
		"""
        cur = conn.cursor()
        cur.execute(sql, (room_id,))
        cur.close()
        conn.commit()
    except Exception:
        logger.error("Failed to save room as deleted")
        raise


def update_comodities(config, driver, city, room_id, survey_id):
    try:
        comodities = []
        comodidades = driver.find_elements(By.CLASS_NAME, 'iikjzje')
        for c in comodidades:
            if (('Indisponível' not in c.text) and ('\n' not in c.text) and (len(c.text) > 0)):
                comodities.append(c.text)
        rowcount = -1
        logging.info("Searching for comodities")
        conn = config.connect()
        cur = conn.cursor()

        sql = """UPDATE room set comodities = %s
				where room_id = %s and survey_id = %s and comodities is null"""
        update_args = (comodities, room_id, survey_id)
        cur.execute(sql, update_args)
        conn.commit()

        logging.info("Comodities of room " + str(room_id) + " updated for " + str(comodities))
        return True
    except selenium.common.exceptions.NoSuchElementException:
        logging.info("Unable to find comodities")
        raise


def update_overall_satisfaction(config, driver, city, room_id):
    try:
        try:
            overall_satisfaction = driver.find_element(By.XPATH, '//*[@id="site-content"]'
                                                       '/div/div[1]/div/div/div/section/div[1]/div[2]/span[1]/span[2]/button/span[1]')
            score = overall_satisfaction.text.replace(',', '.')
        except selenium.common.exceptions.NoSuchElementException:
            logging.info("This room don't have a classification yet.")
            return

        rowcount = -1
        logging.info("Searching for overall satisfaction")
        conn = config.connect()
        cur = conn.cursor()

        sql = """UPDATE room set overall_satisfaction = %s
			where room_id = %s and overall_satisfaction is null"""
        update_args = (score, room_id)
        cur.execute(sql, update_args)
        conn.commit()

        logging.info("Overall satisfaction of room " + str(room_id) + " updated for " + str(score))
        return True
    except selenium.common.exceptions.NoSuchElementException:
        logging.info("Unable to find overall satisfaction")
        raise


def update_bathroom(config, driver, city, room_id, survey_id):
    try:
        # try:
        x = driver.find_element(
            By.XPATH, '//*[@id="site-content"]/div/div/div[3]/div[1]/div/div[1]/div/div/div/div/div[1]/div[2]/span[7]')
        bathroom = x.text
        '''except selenium.common.exceptions.NoSuchElementException:
			logging.info("This room don't have bathroom specifications.")
			return'''

        rowcount = -1
        logging.info("Searching for price")
        conn = config.connect()
        cur = conn.cursor()

        sql = """UPDATE room set bathroom = %s
			where room_id = %s and survey_id = %s"""
        update_args = (bathroom, room_id, survey_id)
        cur.execute(sql, update_args)
        conn.commit()

        logging.info("Bathroom of room " + str(room_id) + " updated for " + str(bathroom))
        return True
    except selenium.common.exceptions.NoSuchElementException:
        logging.info("Unable to find element")
        raise


def update_price(config, driver, city, room_id):
    try:
        try:
            x = driver.find_element(
                By.XPATH, '//*[@class="_ymq6as"]/span/span[@class="_pgfqnw"]')
            price = float(x.text.replace('.', '').replace(',', '.').split('R$')[1])
        except selenium.common.exceptions.NoSuchElementException:
            logging.info("This room don't have a price yet.")
            return

        rowcount = -1
        logging.info("Searching for price")
        conn = config.connect()
        cur = conn.cursor()

        sql = """UPDATE room set price = %s, currency = 'RS'
			where room_id = %s"""
        update_args = (price, room_id)
        cur.execute(sql, update_args)
        conn.commit()

        logging.info("Price of room " + str(room_id) + " updated for " + str(price))
        return True
    except selenium.common.exceptions.NoSuchElementException:
        logging.info("Unable to find element")
        raise


def airbnb_score_search(config, city, survey_id):
    try:
        driver = None
        rowcount = -1
        logging.info("Initialing search by overall satisfactions")
        conn = config.connect()
        cur = conn.cursor()

        sql = """SELECT distinct(room_id) from room, search_area
				where survey_id in ( select distinct(survey_id) from survey where ss_id = %s)"""  # and comodities is null
        
        cur.execute(sql, (survey_id,))
        rowcount = cur.rowcount
        logging.info(str(rowcount) + " results")

        if rowcount > 0:
            results = cur.fetchall()
            for result in results:
                room_id = result[0]
                url = DOMAIN + str(result[0])
                for i in range(config.ATTEMPTS_TO_FIND_PAGE):
                    try:
                        logging.info("Attempt " + str(i+1) + " to find room " + str(room_id))
                        driver = prepare_driver(url)

                        if not driver:
                            return

                        if url not in driver.current_url:
                            logging.info("Room " + str(room_id) + " has been removed")
                            save_as_deleted(config, room_id)
                            driver.quit()
                            break
                        logging.info("chegou aqui depois de preparar o driver")
                        time.sleep(3)
                        # try to identify a plugin with cookie's preference blocking the screen
                        try:
                            driver.find_element(
                                By.XPATH, '/html/body/div[1]/div[2]/div[4]/div[2]/div/button').click()
                        except (selenium.common.exceptions.NoSuchElementException,
                                selenium.common.exceptions.ElementNotInteractableException):
                            try:
                                driver.find_element(
                                    By.XPATH, '/html/body/div[6]/div/div/div[1]/section/footer/div[2]').click()
                            except:
                                try:
                                    driver.find_element(
                                        By.XPATH, '/html/body/div[6]/div/div/div[1]/section/footer/div[2]/button').click()
                                except:
                                    logging.info("No cookies privacy")
                        time.sleep(3)
                        try:
                            update_bathroom(config, driver, city, room_id, survey_id)
                        except:
                            logging.info("No bathroom finded")
                        update_comodities(config, driver, city, room_id, survey_id)
                        
                        driver.quit()
                        logging.info("Data collected")
                        break
                    except selenium.common.exceptions.TimeoutException:
                        logging.info("TimeOutException")
                        if driver is not None:
                            driver.quit()
                        continue
                    except (SystemExit, KeyboardInterrupt):
                        logging.info("Interrupted execution")
                        if driver is not None:
                            driver.quit()
                        exit(0)
    except selenium.common.exceptions.WebDriverException:
        logger.error("WebDriverException")
    except Exception:
        logger.error("Failed to search overall satisfactions")
        raise
