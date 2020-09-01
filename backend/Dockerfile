FROM tiangolo/uwsgi-nginx-flask:python3.6

ENV FLASK_ENV=production

RUN apt-get update
RUN apt-get -y install default-libmysqlclient-dev || apt-get -y install libmysqlclient-dev

COPY requirements.txt /backend/requirements.txt

WORKDIR /backend

RUN pip install -r requirements.txt

COPY app /backend/app
COPY config.py /backend/config.py
COPY bnbgotit.py /backend/bnbgotit.py
COPY run.sh /backend/run.sh
COPY wait-for-it.sh /backend/wait-for-it.sh

RUN chmod +x /backend/run.sh
RUN chmod +x /backend/wait-for-it.sh

CMD ./run.sh