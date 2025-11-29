# 💻 Frontend --- Sistema de Facturación

Tecnologías: **React + TypeScript + Material UI + Axios + Vite +
Docker**

Este frontend permite: ✔ Crear facturas\
✔ Validaciones\
✔ Tabla con filtros\
✔ Vista detallada\
✔ Descargar PDF\
✔ Enviar factura por correo automáticamente

------------------------------------------------------------------------

## Instalación

``` bash
  npm install
  npm run dev
```

------------------------------------------------------------------------

## Docker

``` bash
  docker compose build
  docker compose up -d
```

------------------------------------------------------------------------

## API Base

`src/services/api.ts`

``` ts
export const api = axios.create({
  baseURL: "http://localhost:4000/api",
});
```

------------------------------------------------------------------------

## Crear factura + enviar correo

``` ts
const res = await api.post("/invoices", data);
await api.post(`/invoices/send-email/${res.data.invoice._id}`);
```

------------------------------------------------------------------------

## Descargar PDF

``` ts
window.open(`/api/invoices/pdf/${invoice._id}`, "_blank");
```

------------------------------------------------------------------------

## Estructura

    src/
    │── pages/
    │── components/
    │── services/
    │── theme.ts
