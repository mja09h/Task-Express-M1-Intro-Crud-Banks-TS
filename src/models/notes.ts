import { Schema, model } from "mongoose";

const noteSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "accounts", required: true },
}, { timestamps: true });

const Note = model("notes", noteSchema);

export default Note;