FROM node:lts-alpine3.14

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]
