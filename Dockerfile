FROM node:15.5.1-alpine3.10

WORKDIR /usr/src/app

# I'm building locally since I don't want to add container registry to this project
COPY backend/package*.json ./
RUN npm ci --only=production --verbose
COPY backend/ ./

CMD [ "npm", "run", "prod" ]

# docker rm -f gofood_web
# docker build -t gofood .
# docker run -d \
#            --name gofood_web \
#            -p 3000:3000 \
#            --env-file .env \
#            gofood
# docker exec gofood_web python manage.py collectstatic --noinput