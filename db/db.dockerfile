FROM mysql:latest

WORKDIR /docker-entrypoint-initdb.d

COPY db .

RUN mysql -uroot -ppassword < pihole.sql

EXPOSE 3306