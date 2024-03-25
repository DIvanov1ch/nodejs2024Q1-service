# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.11.0

FROM node:${NODE_VERSION}-alpine as develop

WORKDIR /usr/src/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev

COPY . .

COPY package.json .

CMD npm run prisma:generate && npm run prisma:migrate && npm run start:dev
