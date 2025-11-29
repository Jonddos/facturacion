# 🧾 Backend --- Sistema de Facturación

Tecnologías: **Node.js + Express + TypeScript + MongoDB + PDFKit +
Nodemailer + Docker**

Este backend gestiona: - Creación de facturas - Detalles de productos -
Generación de PDF profesional (con tabla, logo y QR) - Envío automático
de factura al correo del cliente - Descarga directa del PDF

------------------------------------------------------------------------

## 🚀 Requisitos

-   Node 18+
-   Docker & Docker Compose
-   MongoDB (local o Docker)

------------------------------------------------------------------------

## 📂 Estructura del Proyecto

    backend/
    │── src/
    │   ├── controllers/
    │   │   └── invoice.controller.ts
    │   ├── models/
    │   │   ├── Invoice.ts
    │   │   └── InvoiceDetail.ts
    │   ├── routes/
    │   │   └── invoice.routes.ts
    │   ├── utils/
    │   │   ├── generateInvoicePDF.ts
    │   │   └── mailer.ts
    │── public/
    │   └── logo.png
    │── temp/
    │── Dockerfile
    │── tsconfig.json
    │── package.json

------------------------------------------------------------------------

## ⚙️ Instalación (Modo Developer)

``` bash
npm install
npm run dev
```

------------------------------------------------------------------------

## 🐳 Docker (Modo Producción)

``` bash
docker compose build
docker compose up -d
```

Backend corre en:\
`http://localhost:4000`

------------------------------------------------------------------------

## 🔐 Variables de Entorno `.env`

    PORT=4000
    MONGO_URI=mongodb://mongo:27017/facturacion
    EMAIL_HOST=smtp.gmail.com
    EMAIL_PORT=587
    EMAIL_USER=tu-correo@gmail.com
    EMAIL_PASS=tu-app-password
    NODE_ENV=production

------------------------------------------------------------------------

## 📡 Endpoints

### Crear factura

    POST /api/invoices

### Obtener todas

    GET /api/invoices

### Obtener por ID

    GET /api/invoices/:id

### Descargar PDF

    GET /api/invoices/pdf/:id

### Enviar por correo

    POST /api/invoices/send-email/:id

------------------------------------------------------------------------

## 🧾 PDF

Incluye: - Logo - QR - Tabla - Zebra rows - Totales - Pie de página
