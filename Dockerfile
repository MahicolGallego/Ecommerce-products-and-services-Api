FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /home/ecommerce-products-and-services-api

# Copia los archivos del proyecto al directorio de trabajo en el contenedor
COPY ./ .

# Instala las dependencias
RUN npm install

# Compila la aplicación para producción
# RUN npm run build

CMD ["npm", "run", "start:dev" ]