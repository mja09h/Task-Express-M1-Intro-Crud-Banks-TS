import express from "express";
import { accounts } from "../data/accounts";
import router from "./api/acc.routes";

const app = express();
const PORT = 5000;
const HOST = '127.0.0.1';

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/', router);



app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

export default app;

