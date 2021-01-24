FROM node:15.5.1-alpine3.10

WORKDIR /usr/src/app

# I'm building locally since I don't want to add container registry to this project
COPY backend/package*.json ./
RUN npm ci --only=production --verbose
COPY backend/ ./
