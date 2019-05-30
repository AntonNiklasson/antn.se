FROM node:11

WORKDIR /app

ENV NODE_ENV=production

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .

RUN yarn prod:build
CMD yarn prod:run
