FROM mhart/alpine-node:12

# Workdir
WORKDIR /app

EXPOSE 9000

ENV NODE_ENV production

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install --production=true

COPY ./template ./template
COPY ./app ./app

CMD [ "node", "app/index.js" ]
