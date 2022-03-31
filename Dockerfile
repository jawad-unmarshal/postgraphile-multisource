FROM node:17-alpine

WORKDIR /src
COPY . ./
RUN npm install -g nodemon
RUN npm install

ENTRYPOINT ["npm", "start"]
