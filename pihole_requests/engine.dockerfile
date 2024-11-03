FROM python:latest

WORKDIR /usr/src/app

COPY pihole_requests/requirements.txt ./

RUN pip install -r requirements.txt

COPY pihole_requests .