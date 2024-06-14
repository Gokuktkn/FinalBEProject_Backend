import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  feedback: { type: String, required: true }
});

export const feedbackModel = mongoose.model('feedback', feedbackSchema)