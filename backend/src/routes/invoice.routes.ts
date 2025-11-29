import { Router } from "express";
import * as invoiceController from "../controllers/invoice.controller";

const router = Router();

router.post("/", invoiceController.createInvoice);
router.get("/", invoiceController.getInvoices);
router.get("/:id", invoiceController.getInvoiceById);
router.post("/send-email/:id", invoiceController.sendInvoiceEmail);

export default router;
