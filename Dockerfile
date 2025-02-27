FROM node:20.18.2-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY tsconfig.json ./
COPY src/ ./
COPY config/ ./

FROM base AS dev
EXPOSE 3000
CMD ["npm", "run", "start:dev"]
