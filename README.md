# 📦 Proyecto Fullstack --- Sistema de Facturación

Tecnologías: **React + TypeScript + Material UI + Node.js + Express +
TypeScript + MongoDB + Docker + PDFKit**

Este proyecto es una aplicación **Fullstack** que permite gestionar
facturas, generar documentos PDF profesionales con QR y enviarlos
automáticamente por correo electrónico.

Incluye:

-   **Frontend** en React + Vite + TypeScript
-   **Backend** en Node.js + Express + TypeScript
-   **MongoDB** como base de datos
-   **PDFKit** para generación de facturas en PDF
-   **Nodemailer** para envío de correos
-   **Docker Compose** para despliegue completo
-   **API REST** limpia y organizada
-   **UI moderna con Material UI**

------------------------------------------------------------------------

## Estructura General del Proyecto

    /proyecto-root
    │── backend/
    │   ├── src/
    │   ├── public/
    │   ├── temp/
    │   ├── Dockerfile
    │   └── README.md
    │
    │── frontend/
    │   ├── src/
    │   ├── public/
    │   ├── nginx.conf
    │   ├── Dockerfile
    │   └── README.md
    │
    │── docker-compose.yml
    │── README.md (este archivo)

------------------------------------------------------------------------

## Funcionalidades Principales

### ✔ Crear Facturas

-   Datos del cliente
-   Múltiples ítems dinámicos
-   Cálculo automático de subtotal, IVA, total

### ✔ Generación de PDF

-   Tabla profesional de productos
-   Logo incluido
-   QR de número de factura
-   Zebra rows (filas alternadas)
-   Totales
-   Pie de página firmado

### ✔ Envío Automático por Correo

Al crear una factura, se envía:

-   PDF adjunto
-   Información detallada
-   Mensaje personalizado al cliente

### ✔ Descarga de PDF

Botón directo para descargar desde el frontend.

### ✔ Panel de facturas

-   Tabla con filtros avanzados
-   Búsqueda
-   Paginación
-   Enlaces al detalle

------------------------------------------------------------------------

## ⚙️ Requisitos

-   Node.js 18+
-   Docker (opcional pero recomendado)
-   MongoDB (local o en contenedor)
-   App Password de Gmail (o SMTP alternativo)

------------------------------------------------------------------------

## 🐳 Despliegue con Docker Compose

Desde la raíz del proyecto:

``` bash
docker compose build
docker compose up -d
```

Servicios levantados:

  Servicio   Puerto
  ---------- -----------------------
  Frontend   http://localhost:5173
  Backend    http://localhost:4000
  MongoDB    localhost:27017

------------------------------------------------------------------------

## 🌐 Variables de Entorno

El backend usa un `.env`:

    PORT=4000
    MONGO_URI=mongodb://mongo:27017/facturacion
    EMAIL_HOST=smtp.gmail.com
    EMAIL_PORT=587
    EMAIL_USER=correo@example.com
    EMAIL_PASS=PASSWORD
    NODE_ENV=production

------------------------------------------------------------------------

## Construcción del Proyecto

### Backend:

``` bash
cd backend
npm install
npm run dev
```

### Frontend:

``` bash
cd frontend
npm install
npm run dev
```

------------------------------------------------------------------------

## Despliegue en la Nube

### Backend recomendado:

-   **Railway**
-   **Render**
-   **Fly.io**

### Frontend recomendado:

-   **Vercel**
-   **Netlify**

------------------------------------------------------------------------

## Envío de Facturas

El backend utiliza Nodemailer con Gmail App Password.\
Se envía al correo del cliente en formato PDF.

------------------------------------------------------------------------

## Tecnologías Clave

  Área            Tecnología
  --------------- ------------------------------
  Frontend        React, TypeScript, MUI, Vite
  Backend         Node.js, Express, TypeScript
  Base de datos   MongoDB
  PDFs            PDFKit
  Correos         Nodemailer
  Despliegue      Docker, Render, Vercel
  QR              qrcode

------------------------------------------------------------------------

## 👨‍💻 Autor

Proyecto desarrollado por **Jonathan** 

------------------------------------------------------------------------

## 📘 Licencia

MIT
