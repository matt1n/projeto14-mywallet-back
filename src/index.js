import express from "express";
import cors from "cors";
import authRouters from "./routes/authRoutes.js"
import walletRouters from "./routes/walletRoutes.js"

const app = express();
app.use(express.json());
app.use(cors());
app.use(authRouters)
app.use(walletRouters)

app.listen(5000, () => console.log("Server running in port: 5000"));
