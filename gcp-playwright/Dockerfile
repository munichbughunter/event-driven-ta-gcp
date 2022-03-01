FROM mcr.microsoft.com/playwright:bionic
USER root
WORKDIR /automation
COPY package.json ./

RUN npm i

COPY . ./

RUN npx playwright test --project=chromium --reporter=list