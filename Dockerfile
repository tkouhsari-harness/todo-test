FROM node:20.12.0-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm install -g ts-node

RUN npm install 

COPY . .

RUN npm run test

EXPOSE 3000

CMD ["ts-node", "src/index.ts"]
