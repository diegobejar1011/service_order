import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { indexRouter } from "./shared/IndexRouter";

dotenv.config();

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use(indexRouter);

app.listen(PORT, () => {
    console.log('Servidor funcionando');
});