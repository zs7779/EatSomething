FROM node:14

WORKDIR /usr/src/app

COPY frontend/package*.json frontend/
RUN cd frontend && npm ci --only=production
COPY frontend/ frontend/
RUN cd /usr/src/app/frontend && npm run build && cp -r build .. && cd /usr/src/app/ && mv build dist

COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ ./

CMD ["npm", "run", "prod"]