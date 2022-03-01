FROM mcr.microsoft.com/playwright:bionic
USER root
WORKDIR /automation
COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . ./

RUN apg-get update
RUN apt-get install wget

RUN npm test:chrome