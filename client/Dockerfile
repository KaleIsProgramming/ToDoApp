FROM node:20-alpine3.19

WORKDIR /usr/src/app

COPY . .

RUN npm install --production

RUN npm run build

CMD ['npm', 'run']