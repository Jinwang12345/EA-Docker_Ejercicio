# Simple React App with Docker

Frontend en React que muestra un contador de hits consumiendo una API REST.

## Arquitectura

En el contexto del proyecto completo:
- Se ejecuta en la red interna `backend-network`
- No expone puertos al exterior directamente
- Es servido a través del proxy inverso Nginx
- Se comunica con la API a través de rutas relativas `/api/*`

## Variables de entorno

La aplicación utiliza las siguientes variables de entorno
`REACT_APP_API_URL`

Esta configurada en .env.development y en .env.production 

### Docker

Development 
docker build --build-arg NGINX_ENV=development -t mi-react-app-dev ./simpleReactApp
docker run -p 3000:80 mi-react-app-dev

Producción:
docker build --build-arg NGINX_ENV=production -t mi-react-app ./simpleReactApp
docker run -p 80:80 mi-react-app


