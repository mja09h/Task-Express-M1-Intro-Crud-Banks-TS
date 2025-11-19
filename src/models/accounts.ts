import { Schema, model } from "mongoose";

const accountSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        funds: { type: Number, required: true, default: 0 },
        createdAt: { type: Date, default: Date.now, required: true },
    },
    { timestamps: true }
);

const Account = model("accounts", accountSchema);

export default Account;