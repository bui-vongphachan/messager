FROM node:14-alpine3.14 as builder

WORKDIR /app
COPY . .
RUN npm i --only=prod && npm i --save-dev @types/jest && npm i -g typescript && tsc --build

FROM node:14-alpine3.14
COPY --from=builder /app /app
CMD ["node", "/app/build/index.js"]