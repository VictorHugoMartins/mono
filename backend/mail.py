# import mailtrap as mt
# # create client and send
# token="9c6f90bfbee96a3ba3631b3ccad3dc5d"

# import mailtrap as mt

# # create mail object
# mail = mt.Mail(
#     sender=mt.Address(email="mailtrap@example.com", name="Mailtrap Test"),
#     to=[mt.Address(email="your@email.com")],
#     subject="You are awesome!",
#     text="Congrats for sending test email with Mailtrap!",
# )

# # create client and send
# client = mt.MailtrapClient(token="your-api-key")
# client.send(mail)

from general_config import ABConfig

def db_ping():
		"""
		Test database connectivity, and print success or failure.
		"""
		try:
				config = ABConfig()
				conn = config.connect()
				if conn is not None:
						print("Connection test succeeded: {db_name}@{db_host}"
									.format(db_name=config.DB_NAME, db_host=config.DB_HOST))
				else:
						print("Connection test failed")
		except Exception as e:
				logging.exception("Connection test failed")