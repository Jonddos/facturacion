import { Schema, model } from "mongoose";

const ItemSchema = new Schema({
    code: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    appliesTax: { type: Boolean, default: false },
    stock: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
});

export default model("Item", ItemSchema);
