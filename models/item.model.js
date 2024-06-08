import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    itemName: { type: String, require: true },
    price: { type: Number, require: true },
    discount: { type: Number, require: true },
    variants: [
        {
            name: { type: String, require: true },
            type: []
        }
    ],
    description: String,
    images: { type: Array, require: true },
    food_type: { type: String, required: true },
    ID: { type: Number, require: true },
    deleted: { type: Boolean, require: true }
});

export const itemModel = mongoose.model('item', itemSchema)
