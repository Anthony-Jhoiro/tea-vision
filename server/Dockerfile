FROM bitnami/node:latest

COPY . /app

WORKDIR /app

RUN yarn install --frozen-lockfile

EXPOSE 3001

ENV HOST=0.0.0.0
ENV PORT=3000

CMD node main.js
