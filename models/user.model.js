import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    salt: { type: String, require: true },
    GLOBAL_ID: { type: String, require: true },
    ROLE: {type: String, require: true},
});

export const userModel = mongoose.model('user', userSchema)