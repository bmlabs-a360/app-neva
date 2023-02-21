#docker build -t app-backoffice .
#docker run --rm -d  -p 3002:80 app-backoffice

# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install --loglevel=verbose
COPY . .
RUN npx vue-cli-service build --mode=production

# production stage
FROM nginx:1.13.12-alpine as production-stage
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /app/dist /usr/share/nginx/html/neva
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
