FROM node:16-alpine

WORKDIR /app

#Copiamos los ficheros de configuracion
COPY package*.json ./
COPY .env* ./
COPY tsconfig.json ./

# Copiamos el codigo fuente
COPY src/ ./src/

# Alternativas para instalar dependencias
# 1) npm install -- instala les dependències i actualitza package-lock.json
# 2) npm ci -- instal·la les dependències exactes de package-lock.json
RUN npm ci
RUN npm run build

EXPOSE 3000

# Alternativas para iniciar la aplicación
# 1) npm start -- inicia en modo desarrollo
# 2) npm run start:prod -- inicia en modo producción
CMD ["npm", "start"] 
# CMD ["npm", "run", "start:prod"]
