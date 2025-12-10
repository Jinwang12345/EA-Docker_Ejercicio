# ---------- STAGE 1: Build de la app React ----------
FROM node:16-alpine AS build

WORKDIR /app

# Copiamos solo lo necesario para instalar dependencias primero
COPY package*.json ./
COPY .env* ./

RUN npm install

# Copiamos el resto del código
COPY . .

# Generamos el build estático
RUN npm run build

# ---------- STAGE 2: Servir con Nginx ----------
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Copiamos el build generado en el stage "build"
COPY --from=build /app/build /usr/share/nginx/html

# Elegir config de Nginx por entorno (development / production)
ARG NGINX_ENV=production

# Copiamos el fichero de configuración adecuado
# Debes tener en el contexto:
#   nginx.conf.production
#   nginx.conf.development
COPY nginx.conf.${NGINX_ENV} /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
