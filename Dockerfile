FROM node:20-alpine3.18 as builder

WORKDIR /app

ARG API_ENDPOINT NEXT_PUBLIC_API_ENDPOINT

ENV API_ENDPOINT=${API_ENDPOINT}
ENV NEXT_PUBLIC_API_ENDPOINT=${NEXT_PUBLIC_API_ENDPOINT}

COPY package*.json ./
RUN npm install --prodaction
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "npm","run","start"]
