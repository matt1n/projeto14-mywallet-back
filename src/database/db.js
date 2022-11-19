import dotenv from "dotenv";
import { MongoClient } from "mongodb";

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