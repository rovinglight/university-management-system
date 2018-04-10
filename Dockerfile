FROM ubuntu

COPY ./index.js /app/
VOLUME /test:/data
