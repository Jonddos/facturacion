import { Request, Response } from "express";
import Invoice from "../models/Invoice";
import InvoiceDetail from "../models/InvoiceDetail";
import {generateInvoicePDF} from "../utils/generateInvoicePDF";
import {transporter} from "../utils/mailer";
import fs from "fs";

export const createInvoice = async (req: Request, res: Response) => {
    try {
        const { clientName, clientIdentification, clientEmail, type, items, userId } = req.body;

        if (!items || items.length === 0)
            return res.status(400).json({ message: "La factura debe tener al menos 1 ítem" });

        let subtotal = 0;
        let taxTotal = 0;

        const details = items.map((item: any) => {
            const sub = item.unitPrice * item.quantity;
            const tax = item.appliesTax ? sub * 0.19 : 0;

            subtotal += sub;
            taxTotal += tax;

            return {
                ...item,
                subtotal: sub,
                taxAmount: tax,
                total: sub + tax
            };
        });

        const total = subtotal + taxTotal;

        const invoice = await Invoice.create({
            invoiceNumber: "FAC-" + Date.now(),
            clientName,
            clientIdentification,
            clientEmail,
            type,
            userId,
            subtotal,
            taxTotal,
            total,
            dueDate: type === "credit"
                ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                : new Date()
        });

        await InvoiceDetail.insertMany(
            details.map((d) => ({ ...d, invoiceId: invoice._id }))
        );

        res.status(201).json({ invoice });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creando factura" });
    }
};

export const getInvoices = async (req: Request, res: Response) => {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.json(invoices);
};

export const getInvoiceById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const invoice = await Invoice.findById(id);
    const details = await InvoiceDetail.find({ invoiceId: id });

    res.json({ invoice, details });
};

export const sendInvoiceEmail = async (req: any, res: any) => {
    try {
        const { id } = req.params;

        // Obtener factura y detalles
        const invoice = await Invoice.findById(id);
        const details = await InvoiceDetail.find({ invoiceId: id });

        if (!invoice) return res.status(404).json({ message: "Factura no encontrada" });

        // Generar el PDF temporal
        const pdfPath = generateInvoicePDF(invoice, details);

        // Enviar correo
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: invoice.clientEmail,
            subject: `Factura #${invoice.invoiceNumber}`,
            text: `Hola ${invoice.clientName}, adjunto te enviamos la factura #${invoice.invoiceNumber}.`,
            attachments: [
                {
                    filename: `Factura_${invoice.invoiceNumber}.pdf`,
                    path: pdfPath,
                },
            ],
        });

        // Borrar archivo temporal
        fs.unlinkSync(pdfPath);

        res.json({ message: "Factura enviada correctamente por correo" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error enviando factura" });
    }
};
