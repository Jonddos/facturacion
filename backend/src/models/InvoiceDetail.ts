import { Schema, model } from "mongoose";

const InvoiceDetailSchema = new Schema({
    invoiceId: { type: Schema.Types.ObjectId, ref: "Invoice", required: true },
    itemCode: { type: String, required: true },
    itemName: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    appliesTax: { type: Boolean, default: false },
    taxAmount: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true }
});

export default model("InvoiceDetail", InvoiceDetailSchema);
