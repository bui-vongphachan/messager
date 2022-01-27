FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install -g npm@8.3.2
RUN npm install
RUN npm install -g typescript
COPY . .
RUN tsc --build

CMD ["npm", "start"]