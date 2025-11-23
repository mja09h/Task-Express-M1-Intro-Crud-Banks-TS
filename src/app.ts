import express from "express";
import accRouter from "./api/accounts/acc.routes";
import connectDB from "./database";
import dotenv from "dotenv";
import notesRouter from "./api/notes/notes.routes";

dotenv.config();

export const DB_URI = process.env.DB_URI as string;

if (!DB_URI) {
    throw new Error("MongoDB URI is not set");
}

const app = express();

const PORT = parseInt(process.env.PORT as string) || 5000;
const HOST = process.env.HOST as string || '127.0.0.1';

app.use(express.json());

app.use('/api/accounts', accRouter);
app.use('/api/notes', notesRouter);

connectDB();

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

export default app;