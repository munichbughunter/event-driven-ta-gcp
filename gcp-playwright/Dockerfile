FROM mcr.microsoft.com/playwright:bionic
USER root
WORKDIR /automation
COPY package.json ./

RUN npm i

COPY . ./

RUN apg-get update
RUN apt-get install wget

RUN npm test:chrome