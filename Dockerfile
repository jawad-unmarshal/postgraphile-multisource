FROM node:alpine

WORKDIR /src
COPY . ./
RUN npm install -g nodemon
RUN npm install

ENTRYPOINT ["nodemon", "App.js"]
