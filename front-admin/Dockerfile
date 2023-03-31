FROM node:18 AS build
WORKDIR /usr/src/build
COPY . .
RUN npm install
RUN npm run build
EXPOSE 8080
