import express from "express";
import cors from "cors";

import invoiceRoutes from "./routes/invoice.routes";  // ✔️ este es el correcto

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

// Rutas
app.use("/api/invoices", invoiceRoutes);

export default app;
