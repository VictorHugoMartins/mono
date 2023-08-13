import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def send_mail(email):
    message = MIMEMultipart()
    message["To"] = email
    message["From"] = 'DashAcomodações'
    message["Subject"] = 'Subject line here.'

    title = '<b> Title line here. </b>'
    messageText = MIMEText('''Message body goes here.''', 'html')
    message.attach(messageText)

    system_email = 'airbnbandbookingscrap@gmail.com'
    password = 'Airbnb22'

    server = smtplib.SMTP('smtp.gmail.com:587')
    server.ehlo('Gmail')
    server.starttls()
    server.login(system_email, password)
    fromaddr = 'From line here.'
    toaddrs = 'Address you send to.'
    server.sendmail(fromaddr, toaddrs, message.as_string())

    server.quit()

send_mail('vmartins0709@gmail.com')