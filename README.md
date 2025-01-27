<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

  <p align="center">NEST JS</p>

<p align="center">
  <img src="https://www.shopweb.in/images/imageforecommercewebsite.jpg" width="100%" >
</p>

## ECOMMERCE PRODUCTOS Y SERVICIOS

## Descripción

Esta API permite la gestión de una plataforma de comercio electrónico para productos y servicios. Incluye funciones como la gestión del carrito de compras, pedidos, pagos, reembolsos y comparación de productos. Los vendedores pueden gestionar sus cuentas, variantes de productos y horarios de servicio. La API implementa Control de Acceso Basado en Roles (RBAC) para restringir las acciones según los roles de usuario (por ejemplo, comprador, vendedor, administrador) y tipos de vendedor (por ejemplo, tienda, proveedor de servicios). La autenticación está asegurada mediante tokens Bearer, garantizando operaciones seguras en toda la plataforma.

## Requisitos de Software

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas en tu sistema:

1. **Docker y Docker Compose**

   - Docker: [Descargar e instalar Docker para Windows y macOS](https://www.docker.com/products/docker-desktop/)
   - Docker para Linux: [Guía de instalación para Linux](https://docs.docker.com/engine/install/)
   - Docker Compose ya viene incluido con Docker Desktop. En Linux, puedes instalarlo siguiendo [esta guía](https://docs.docker.com/compose/install/).

2. **Node.js** (opcional, solo si deseas ejecutar el proyecto fuera de Docker)

   - Recomendado: [Node.js LTS](https://nodejs.org/) (versión 18 o superior).

3. **Git** (opcional, para clonar el repositorio)

   - [Descargar e instalar Git](https://git-scm.com/)

4. **Editor de código** (opcional, recomendado Visual Studio Code)

   - [Descargar VS Code](https://code.visualstudio.com/)

5. **Cliente para realizar solicitudes HTTP** (opcional)

   - Recomendado: [Postman](https://www.postman.com/downloads/) o [Insomnia](https://insomnia.rest/download).

6. **Gestor de bases de datos** (opcional, para visualizar y administrar la base de datos)
   - Recomendado: [DBeaver](https://dbeaver.io/download/)

---

## Configuración del Proyecto

### (** Para ejecutar comandos en consola recuerda siempre estar ubicado en la ruta del proyecto**)

### 1. Crear el archivo `.env`

En la raíz del proyecto, debes crear un archivo llamado `.env` basado en el archivo `.env.template` que también se encuentra en la raíz del proyecto.

puedes hacerlo manualmente o por medio de la consola

```bash
cp .env.template .env
```

En este archivo `.env`, configura las siguientes variables según tus necesidades:

- **STAGE**: `dev` o `prod`. Define si el entorno es de desarrollo o producción.
- **HASH_SALT**: Se recomienda un valor de `12` para el salt utilizado en la encriptación de contraseñas.
- **DB_HOST**: Debe ser siempre el nombre del servicio definido para la base de datos en el compose.
- **DB_PORT**: Tiene el valor del puerto dentro del contenedor asignado en el compose para la base de datos.

Ejemplo de archivo `.env`:

```
STAGE=dev
HASH_SALT=12
DB_HOST=postgres-db
DB_PORT=5432
DB_USERNAME=myuser
DB_PASSWORD=mypassword
DB_NAME=mydatabase
JWT_SECRET=mysecret
```

### \*Las variables DB serán las que se emplearán al para configurar las variables de entorno de los contenedores de docker

---

### 2. Requisitos Previos

Asegúrate de que Docker esté instalado y en ejecución antes de continuar. Puedes verificarlo ejecutando:

```bash
docker --version
docker-compose --version
```

En Linux, si Docker Compose está instalado pero desactivado, actívalo utilizando el siguiente comando:

```bash
sudo systemctl enable docker.service
sudo systemctl enable containerd.service
```

---

## Levantar los Contenedores

Para iniciar el proyecto con Docker, sigue estos pasos:

1. Clona el repositorio si aún no lo has hecho:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_PROYECTO>
   ```

2. Verifica que tengas un archivo `.env` configurado correctamente en la raíz del proyecto (ver sección anterior).

3. Ejecuta el siguiente comando para construir y levantar los contenedores:

   ```bash
   docker compose -f docker-compose.yml up --build
   ```

4. Una vez que los contenedores estén levantados, accede a la aplicación y base de datos a través de los puertos locales respectivos configurados en para los servicios en tu archivo `docker-compose` (para re asignar modifica los "ports: -"). Por defecto son:

- **APP**: 3000
- **DB**: 5433

  Por ejemplos:

  ```
  http://localhost:3000
  ```

  \*\* En los gestores de bases de datos asegurate de crear las conexiones usando el puerto designado para el servicio de base de datos en el compose. Por ejemplo: 5433

5. Para detener los contenedores, utiliza:

   ```bash
   docker compose down
   ```

---

## Archivos Relacionados

- **`docker-compose.yml`**: Contiene la configuración de los servicios Docker.
- **`.env.template`**: Plantilla para configurar las variables de entorno necesarias.

---

## Notas Importantes

- Asegúrate de no compartir tus archivos `.env` en repositorios públicos para evitar exponer información sensible como contraseñas y secretos.
- Si encuentras algún problema al levantar los contenedores, asegúrate de revisar los logs de Docker ejecutando:

  ```bash
  docker compose logs
  ```

---

## Recursos adicionales

### Documentación de la API

- Una vez que el proyecto esté correctamente levantado, podrás acceder a la documentación de los endpoints de la API desde tu navegador. Usa la siguiente URL, sustituyendo (puerto_definido) por el puerto mapeado para la API en el archivo docker-compose.yml.
  Ejemplo con el puerto por defecto (3000): http://localhost:3000/api/v1/ecommerce-products-and-service/docs
