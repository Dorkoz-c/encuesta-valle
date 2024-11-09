# React + Vite

Este proyecto es una aplicación de votación creada con **React** para el frontend y **Node.js** con **Express** para el backend, usando **MongoDB Atlas** para la base de datos. Los usuarios pueden votar por uno de dos candidatos y dejar un comentario, mientras el sistema controla el conteo de votos y determina automáticamente el ganador cuando se alcanzan 10 votos.

---

## Tabla de Contenidos
- [Características](#características)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración de la Base de Datos (MongoDB Atlas)](#configuración-de-la-base-de-datos-mongodb-atlas)
- [Uso](#uso)
---

## Características

- **Registro de Votos**: Permite a los usuarios votar por uno de dos candidatos y dejar un comentario.
- **Sistema de Palabras Prohibidas**: Filtra palabras ofensivas en los comentarios y las reemplaza por asteriscos.
- **Verificación de Nickname**: Valida el nombre de usuario para asegurar que cumpla con ciertos criterios.
- **Cálculo Automático del Ganador**: Determina el ganador automáticamente cuando se alcanzan 10 votos.
- **Interfaz Responsiva**: Adaptada para dispositivos móviles y de escritorio.

## Requisitos

Antes de empezar, asegúrate de tener los siguientes requisitos:

- **Node.js** (v14 o superior)
- **npm** (gestor de paquetes de Node.js)
- **Cuenta en MongoDB Atlas** (para la base de datos en la nube)

## Instalación

### Paso 1: Clonar el Repositorio
Primero, clona el repositorio a tu máquina local:
```bash
git clone https://github.com/Dorkoz-c/encuesta-valle/tree/main
cd tu-repositorio
```
#Paso 2: Instalar Dependencias
#Backend:
Dirígete a la carpeta del backend e instala las dependencias de Node.js:
```bash
cd backend
npm install
```
#Frontend:
Luego, dirígete a la carpeta del frontend e instala las dependencias de React:
```bash
cd ../frontend
npm install
```
## Configuración de la Base de Datos (MongoDB Atlas)
Crea una cuenta en MongoDB Atlas si aún no tienes una.
Crea un nuevo cluster y una base de datos.
Crea un usuario de base de datos con los permisos adecuados para la base de datos.
Copia la URI de conexión de MongoDB Atlas.
En el backend, crea un archivo .env en la raíz del proyecto y agrega la URI de conexión:

```bash
MONGODB_URI=tu-uri-de-conexión
```
## Uso
En primer lugar, asegúrate de haber configurado correctamente la base de datos de MongoDB y de haber instalado las dependencias.

En la carpeta backend, ejecuta el servidor:
```bash
npm start
```
Esto levantará el servidor en http://localhost:5000.

En la carpeta frontend, ejecuta la aplicación de React:
```bash
npm run dev
```
