FROM node:14-alpine3.14 as builder

WORKDIR /app
COPY . .
RUN npm i && npm run build

FROM node:14-alpine3.14
COPY --from=builder /app /app
CMD ["npm", "--prefix", "./app/", "run", "start"]