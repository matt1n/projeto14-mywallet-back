import express from "express";
import cors from "cors";
import authRouters from "./routes/authRoutes.js"
import walletRouters from "./routes/walletRoutes.js"
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());
app.use(authRouters)
app.use(walletRouters)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running in port: ${port}`));
