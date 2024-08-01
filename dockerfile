# Etapa de construcción
FROM node:22.2.0 AS build

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar el archivo de configuración de Nginx personalizado, si tienes uno
COPY ./conf.d/default.conf /etc/nginx/conf.d/
COPY nginx.conf /etc/nginx/nginx.conf

# Remover los archivos predeterminados de Nginx y copiar los archivos construidos
RUN rm -rf /usr/share/nginx/html/* 
COPY dist /usr/share/nginx/html
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto en el que correrá Nginx
EXPOSE 80

# Iniciar Nginx cuando se levante el contenedor
CMD ["nginx", "-g", "daemon off;"]
