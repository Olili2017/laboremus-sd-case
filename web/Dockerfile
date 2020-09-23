FROM node:12 as install
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM node:12-slim as dev
WORKDIR /app
COPY --from=install /app/node_modules /app/node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]