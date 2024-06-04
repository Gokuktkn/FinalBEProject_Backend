import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    itemName: { type: String, unique: true, require: true },
    price: { type: Number, require: true },
    discount: { type: Number, require: true },
    variants: [
        {
            name: { type: String, require: true },
            type: [String]
        }
    ],
    description: String,
    images: [String],
    food_type: { type: String, required: true }
});

export const itemModel = mongoose.model('item', itemSchema)
