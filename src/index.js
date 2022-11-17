import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import joi from "joi";
import { postSignIn, postSignUp } from "./controllers/authController.js";
import {
  getWallet,
  postMoneyIn,
  postMoneyOut,
} from "./controllers/walletController.js";

export const signUpSchema = joi.object({
  name: joi.string().required().min(3),
  email: joi.string().email().required(),
  password: joi.string().required().min(4),
});

export const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().min(4),
});

export const moneyInOrOutSchema = joi.object({
  value: joi.number().required(),
  description: joi.string().required(),
});

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

try {
  mongoClient.connect();
} catch (err) {
  console.log(err);
}

db = mongoClient.db("API_MyWallet");

export const usersCollection = db.collection("users");
export const sessionsCollection = db.collection("sessions");
export const walletCollection = db.collection("wallet");

app.post("/sign-up", postSignUp);

app.post("/sign-in", postSignIn);

app.post("/wallet/money-in", postMoneyIn);

app.post("/wallet/money-out", postMoneyOut);

app.get("/wallet", getWallet);

app.listen(5000, () => console.log("Server running in port: 5000"));
