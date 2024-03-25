FROM postgres:16-alpine

ENV LANG en_US.utf8

RUN ["mkdir", "/var/log/postgresql"]
RUN ["chown", "postgres:postgres", "/var/log/postgresql"]

CMD ["postgres", "-c", "logging-collector=on", "-c", "log_directory=/var/log/postgresql"]