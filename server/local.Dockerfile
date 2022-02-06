FROM node:14-slim

ENV APP_ROOT /app

WORKDIR $APP_ROOT

COPY package*.json $APP_ROOT

RUN npm install

COPY ./src $APP_ROOT/src
COPY ./tsconfig.json $APP_ROOT
