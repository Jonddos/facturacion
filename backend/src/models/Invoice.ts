import { Schema, model } from "mongoose";

const InvoiceSchema = new Schema({
    invoiceNumber: { type: String, required: true, unique: true },
    clientIdentification: { type: String, required: true },
    clientName: { type: String, required: true },
    clientEmail: {
        type: String,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    type: { type: String, enum: ["cash", "credit"], required: true },

    issueDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },

    userId: { type: String, required: true },

    subtotal: { type: Number, required: true },
    taxTotal: { type: Number, required: true },
    total: { type: Number, required: true },

    status: { type: String, enum: ["active", "cancelled"], default: "active" }
});

export default model("Invoice", InvoiceSchema);
