FROM node:16.16.0-alpine
ARG API_BASE_URL

RUN apk update && apk upgrade
RUN apk add git htop

RUN mkdir -p /app/animize
WORKDIR /app/animize

COPY . /app/animize
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV API_BASE_URL=$API_BASE_URL

EXPOSE 3000

ENTRYPOINT [ "yarn", "start" ]
