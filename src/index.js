import express from "express";
import cors from "cors";
import joi from "joi";
import authRouters from "./routes/authRoutes.js"
import walletRouters from "./routes/walletRoutes.js"

export const signUpSchema = joi.object({
  name: joi.string().required().min(3),
  email: joi.string().email().required(),
  password: joi.string().required().min(4),
});

export const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export const moneyInOrOutSchema = joi.object({
  value: joi.number().required(),
  description: joi.string().required(),
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(authRouters)
app.use(walletRouters)

app.listen(5000, () => console.log("Server running in port: 5000"));
