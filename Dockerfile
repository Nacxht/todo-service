FROM node as builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:slim

ENV NODE_ENV production
USER node

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci --only=production

COPY --from=builder /usr/src/app/dist ./dist


ENV PORT 3000
EXPOSE $PORT

CMD [ "node", "dist/index.js" ]