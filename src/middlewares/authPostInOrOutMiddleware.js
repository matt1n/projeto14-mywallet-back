import { sessionsCollection, usersCollection } from "../database/db.js";
import { walletInOrOutSchema } from "../models/walletInOrOutSchema.js";

export async function authPostInOrOutValidation(req,res,next){
  const moneyInOrOut = req.body;   
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }

  const { error } = walletInOrOutSchema.validate(moneyInOrOut, {
    abortEarly: false,
  });
  if (error) {
    const erros = error.details.map((detail) => detail.message);
    return res.status(422).send(erros);
  }

  const session = await sessionsCollection.findOne({ token });
  if (!session){
    return res.sendStatus(422)
  }

  const user = await usersCollection.findOne({ _id: session?.userId });
  if (!user) {
    return res.sendStatus(401);
  }

  req.user = user
  req.moneyInOrOut = moneyInOrOut

  next()
}