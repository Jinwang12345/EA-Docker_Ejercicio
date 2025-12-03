# Build stage
FROM node:16-alpine as build

WORKDIR /app

# Copiamos los ficheros de configuracion
COPY package*.json ./
COPY .env* ./

RUN npm install
COPY . .

RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

# Argument to select nginx config (development or production)
# ARG NGINX_ENV=production
# Copy the appropriate nginx config based on environment
COPY nginx.conf.${NGINX_ENV} /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
