FROM mysql:latest

COPY db /docker-entrypoint-initdb.d

EXPOSE 3306