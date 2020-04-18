FROM node:12.16.1
ARG HTTPS
ENV USE_HTTPS=$HTTPS
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80
CMD [ "node", "server.js" ]