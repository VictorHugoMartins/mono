ARG PORT=44



FROM cypress/browsers:latest


RUN apt-get install python -y

RUN echo $(python -m site --user-base)

COPY requirements.txt  .

ENV PATH /home/root/.local/bin:${PATH}

RUN  apt-get update && apt-get install -y python-pip && pip install -r requirements.txt  

COPY . .

CMD uvicorn main:app --host 0.0.0.0 --port $PORT