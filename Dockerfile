FROM node:10 AS builder

ADD ["package.json", "package-lock.json", "/sources/"]
WORKDIR /sources
RUN npm ci
COPY . .
RUN npm run build

FROM node:10-alpine
COPY --from=builder ./sources ./sources
WORKDIR /sources
EXPOSE 3000
CMD ["npm", "run", "start:dev"]