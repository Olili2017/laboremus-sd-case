FROM node:10-alpine
WORKDIR /app
EXPOSE 3000
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# FROM node:10-slim as dev
# WORKDIR /app
# COPY --from=install /app/node_modules /app/node_modules
# COPY . .
# EXPOSE 3000
# CMD ["npm", "run", "dev"]