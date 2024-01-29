# BarberHub API
Este proyecto consiste en un backend para la gestión de citas y servicios de una barbería. 
Está construido utilizando Express.js y sigue una arquitectura REST. A continuación, 
se proporcionan instrucciones para iniciar el proyecto y detalles sobre los endpoints disponibles.

-------------------------------
Inicio Rápido
Instala las dependencias:
npm install

--------------------------------
Configura las variables de entorno creando un archivo .env en la raíz del proyecto. 
Asegúrate de incluir las siguientes variables:
# Firebase
FIREBASE_API_KEY=AIzaSyCB9-hDbfuLOuUZfA488HRUo715fvRPYWY
FIREBASE_AUTH_DOMAIN=barberhub-dae45.firebaseapp.com
FIREBASE_PROJECT_ID=barberhub-dae45
FIREBASE_STORAGE_BUCKET=barberhub-dae45.appspot.com
FIREBASE_MESSAGING_SENDER_ID=1041270949233
FIREBASE_APP_ID=1:1041270949233:web:874e038d21c5392357e2d0
FIREBASE_MEASUREMENT_ID=G-NR1ZM9SY7C

# Crypto-js
CRYPTO_KEYCHAIN=df6147b10517f518d4ef7631e34117dc13d7bd5fadc7b75c5f8efa4ca40ea356
CRYPTO_IVCHAIN=ed29dd55c39d48e95dab69bb26584f86

# JWT
JWT_SECRET=b68ed87fe43cf0dbb17f0da5c3070fe6336d2ad394f1eb1ae58fe3db38d8fc1c

# PostgreSQL
PG_USER=fl0user
PG_HOST=ep-lucky-silence-99345788.ap-southeast-1.aws.neon.fl0.io
PG_DATABASE=peluqueria
PG_PASSWORD=jW4sAptbyn2L
PG_PORT=5432
PG_SSL_REJECT_UNAUTHORIZED=false

# Mailer
MAILER_USER=vetsflyfly@gmail.com

MAILER_PASSWORD=yvtx lzho tzdk umkf

MAILER_HOST=smtp.gmail.com

--------------------------------
Corre el proyecto en modo de desarrollo:
npm run dev

--------------------------------
# Endpoints

POST/api/v1/auth
  Requiere un objeto JSON en el cuerpo de la solicitud con las propiedades email y password. 
  Asegúrate de encriptar esta información utilizando AES, utilizando la misma clave y vector que en el frontend. 
  Retorna un JWT con la información del usuario para autorizar otros endpoints.
  
# Rutas Específicas de Entidades:

/api/v1/empleado
 - Endpoint para operaciones relacionadas con empleados.
   
/api/v1/empleado_turno
 - Endpoint para operaciones relacionadas con turnos de empleados.

/api/v1/cliente
 - Endpoint para operaciones relacionadas con clientes.
   
/api/v1/servicio
 - Endpoint para operaciones relacionadas con servicios de barbería.
   
/api/v1/cita
 - Endpoint para operaciones relacionadas con citas en la barbería.
   
/api/v1/empleado_servicio
 - Endpoint para operaciones relacionadas con la asignación de servicios a empleados.
   
/api/v1/sendEmail
 - Endpoint para el envío de correos electrónicos.
   
# URL Server en Producción
https://cloudback-barber.onrender.com
# URL Server en Local
http://localhost:3000
