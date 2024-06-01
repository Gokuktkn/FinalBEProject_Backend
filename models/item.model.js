import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    itemName: { type: String, unique: true, require: true },
    price: Number,
    discount: Number,
    variants: [
        {
            name: { type: String, require: true },
            type: [String]
        }
    ],
    features: String,
    description: String,
    img: [String],
    food_type: String
});

export const itemModel = mongoose.model('item', itemSchema)
