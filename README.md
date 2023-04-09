# Descubrimientos Cósmicos
Este proyecto tiene como objetivo crear una base de datos en línea de descubrimientos cósmicos para su posterior consulta y difusión. En la plataforma se pueden encontrar diferentes tipos de descubrimientos, como planetas, estrellas, asteroides, galaxias y más.

# Funcionalidades
* Agregar nuevos descubrimientos a la base de datos.
* Actualizar información de descubrimientos ya existentes.
* Eliminar descubrimientos de la base de datos.
* Buscar descubrimientos por ID
* Paginacion
* Visualizar detalles de los descubrimientos, incluyendo imágenes y descripciones.

# Tecnologías utilizadas
* Node.js
* Express.js
* MongoDB
* Multer

# Librerias
* bcryptjs
* express
* jsonwebtoken
* mongoose
* mongoose-paginate-v2
* multer 

# Instalación

* Instalar las dependencias: npm install 
* Iniciar el servidor: npm app.js

# Uso en PostMan
* El ingreso de datos debe realizarse desde el form-data 
* La actualizacion de datos debe realizarse desde el form-data 
* Todos los campos deben estar llenos
* Los archivos permitidos son solo png o jpeg a subir

# Rutas de Postman
### 

### Get
* Get General: localhost:3002/Descubrimientos
* Get por ID: localhost:3002/Descubrimientos/{id}
* Get Paginacion: localhost:3002/DescubrimientosPag?limit=2&page=1

### Post
* Post: localhost:3002/Descubrimientos
* Post: localhost:3002/signup
* Post: localhost:3002/login

### Put
* Put: localhost:3002/Descubrimientos/{id}

### Delete
* Delete: localhost:3002/Descubrimientos/{id}

# Autores
Jose Adrian Maradiaga Flores - 202110010288