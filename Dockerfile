FROM node:alpine

WORKDIR /src
COPY . ./
RUN npm install -g nodemon
RUN npm install

ENTRYPOINT ["nodemon","--watch","./config/config.json", "App.js"]
