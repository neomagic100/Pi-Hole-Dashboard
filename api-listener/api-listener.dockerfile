FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ ./

# EXPOSE 8009
EXPOSE 3000

CMD ["npm", "run", "serve"]
