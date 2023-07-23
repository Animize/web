FROM node:16.19.0-alpine

RUN apk update && apk upgrade
RUN apk add git htop curl

RUN mkdir -p /app/animize
WORKDIR /app/animize

COPY . /app/animize
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

RUN yarn install --ignore-scripts
RUN yarn build

EXPOSE 3000

ENTRYPOINT [ "yarn", "start" ]
