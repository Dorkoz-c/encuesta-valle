# React + Vite

Este proyecto es una aplicación de votación creada con **React** para el frontend y **Node.js** con **Express** para el backend, usando **MongoDB Atlas** para la base de datos. Los usuarios pueden votar por uno de dos candidatos y dejar un comentario, mientras el sistema controla el conteo de votos y determina automáticamente el ganador cuando se alcanzan 10 votos.

---

## Tabla de Contenidos
- [Características](#características)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración de la Base de Datos (MongoDB Atlas)](#configuración-de-la-base-de-datos-mongodb-atlas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Uso](#uso)
- [Detalles Técnicos](#detalles-técnicos)
- [Vista Previa](#vista-previa)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

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
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio

### Paso2: Instlar dependencias 
#Backend
cd server
npm install

#Fronted
