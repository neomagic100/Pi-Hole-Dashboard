FROM node:18-slim

WORKDIR /app

COPY .env ./
COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 8009
EXPOSE 3000

CMD ["npm", "run", "serve"]
