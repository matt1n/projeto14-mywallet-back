import { sessionsCollection, usersCollection, walletCollection } from "../database/db.js";
import { ObjectId } from "mongodb";

export async function deleteInOrOutValidation(req,res,next){
  const {id} = req.params;
  const {authorization} = req.headers
  const token = authorization?.replace("Bearer ", "");

  const session = await sessionsCollection.findOne({ token });
  if (!session){
    return res.sendStatus(422)
  }

  const user = await usersCollection.findOne({ _id: session?.userId });
  if (!user) {
    return res.sendStatus(401);
  }

  const idValidation = await walletCollection.findOne({_id: ObjectId(id)})
  if (!idValidation){
    return res.sendStatus(422)
  }

  req.id = ObjectId(id)

  next()
}