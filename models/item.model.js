import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: { type: String, require: true },
    price: Number,
    discount: Number,
    variants: [
        {
            name: String,
            type: [String]
        }
    ],
    features: String,
    description: String,
    img: [String]
});

export const itemModel = mongoose.model('item', itemSchema)