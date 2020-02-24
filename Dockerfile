FROM node:13.8.0

ENV NODE_ENV development

ADD ["package.json", "package-lock.json" , "/sources/"]
WORKDIR /sources
RUN npm ci

ADD ./ /sources

FROM node:13.8.0-alpine

COPY --from=0 /sources/dist /sources
WORKDIR /sources

ENV NODE_ENV development

USER node

EXPOSE 8080

CMD ["run", "start:dev"]
