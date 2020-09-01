FROM node:8.16.0

ARG REACT_APP_ENV
ENV REACT_APP_ENV ${REACT_APP_ENV}

ADD server.js /frontend/server.js

WORKDIR /frontend

RUN npm install express

ADD build /frontend/build

CMD node server.js