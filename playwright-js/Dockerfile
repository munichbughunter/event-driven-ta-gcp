FROM mcr.microsoft.com/playwright:v1.19.2-focal

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
