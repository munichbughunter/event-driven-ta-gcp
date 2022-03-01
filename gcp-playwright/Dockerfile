FROM mcr.microsoft.com/playwright:bionic
USER root
WORKDIR /automation
COPY package.json ./

RUN npm i

COPY . ./

RUN npm test:chrome