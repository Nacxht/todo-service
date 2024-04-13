FROM node as builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# Generate RSA key pair
RUN openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
RUN openssl rsa -pubout -in private_key.pem -out public_key.pem

FROM node:slim

ENV NODE_ENV production
USER node

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci --only=production

COPY --from=builder /usr/src/app/dist ./dist

# Copy RSA keys
COPY --from=builder /usr/src/app/private_key.pem ./private_key.pem
COPY --from=builder /usr/src/app/public_key.pem ./public_key.pem

ENV PORT 3000
EXPOSE $PORT

CMD [ "node", "dist/index.js" ]