FROM node:alpine

WORKDIR /src
COPY . ./
RUN npm install

ENTRYPOINT ["node", "App.js"]
