FROM node:20.18.2-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY src/ ./

FROM base AS dev
EXPOSE 3000
CMD ["npm", "run", "dev"]
