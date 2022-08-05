FROM node:16.16.0-alpine

RUN apk update && apk upgrade
RUN apk add git

RUN mkdir -p /app/animize
WORKDIR /app/animize

COPY . /app/animize
RUN yarn install
RUN yarn run build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

ENTRYPOINT [ "yarn", "start" ]
