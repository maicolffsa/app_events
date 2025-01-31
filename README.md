# Eventos App 🛒

**Descripción:**

Esta aplicacion de eventos fue desarrollada utilizando las siguientes tecnologías:

- **Angular v18:** Para construir un frontend dinámico como Single Page Application (SPA).
- **Angular Material:** Para componentes clave como el carrito de compras y los botones.
- **Node.js con Express:** Para el backend que facilita la comunicación y gestión de datos.
- **MySQL (en la nube):** Base de datos relacional para almacenar datos del evento.
- **Sequelize:** ORM para interactuar con la base de datos MySQL de manera eficiente.
- 

Esta combinación tecnológica permitió crear una plataforma eficiente y escalable, asegurando una experiencia de compra fluida y moderna.

## Características

- Lista de Eventos interactivo: Muestra de eventos con detalles y funcionalidades de búsqueda.
- Funcionalidad de carrito de compras: Permite agregar eventos y realizar compras de manera intuitiva.
- CRUD (Create, Read, Update, Delete): Implementado para gestionar eventos y usuarios en la base de datos.
- Diseño moderno y atractivo: Utilizando Angular Material para una experiencia de usuario mejorada.
- Backend robusto con Node.js y Express: Conectado a una base de datos MySQL en la nube a través de Sequelize.
- Inicio de sesión y manejo de sesiones: Utilizando cookies para mantener las sesiones de usuario seguras y persistentes.
- Seguridad en contraseñas: Las contraseñas de los usuarios se encriptan utilizando bcrypt para garantizar su seguridad.

## Requisitos

- Node.js
- Angular CLI

## Instalación

1. **Instala las dependencias del frontend y del backend:**

    ```bash
    cd frontend
    npm install

    cd ../backend
    npm install
    ```

## Uso

### Backend

1. Navega al directorio del backend:

    ```bash
    cd backend
    ```

2. Inicia el servidor Node.js:

    ```bash
    node server.js
    ```


### Frontend

1. Navega al directorio del frontend:

    ```bash
    cd frontend
    ```

2. Ejecuta la aplicación Angular:

    ```bash
    ng serve -o
    ```

   Esto abrirá la aplicación en `http://localhost:4200/`.

