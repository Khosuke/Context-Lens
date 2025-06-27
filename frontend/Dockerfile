FROM node:20-alpine AS build

WORKDIR /app

COPY frontend/ .
COPY components/result-graph.js components/

RUN npm install
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
