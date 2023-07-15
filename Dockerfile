FROM node:16

WORKDIR /usr/app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 8080
ENV PORT 8080
CMD [ "yarn", "start" ]
