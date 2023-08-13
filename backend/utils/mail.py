import mailtrap as mt
# create client and send
token = "f143c000ee7a32cc4bb4fd4171a821bd"


def send_mail(email):
    # create mail object
    mail = mt.Mail(
        sender=mt.Address(
            email="victor.martins1@aluno.ufop.edu.br", name="Mailtrap Test"),
        to=[mt.Address(email=email)],
        subject="You are awesome!",
        text="Congrats for sending test email with Mailtrap!",
    )

    # create client and send
    client = mt.MailtrapClient(token=token)
    client.send(mail)
