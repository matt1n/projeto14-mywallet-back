import { ObjectId } from "mongodb";
import { walletCollection } from "../database/db.js";
import { walletInOrOutSchema } from "../models/walletInOrOutSchema.js";

export async function authPutInsAndOutsValidation(req,res,next){
    const moneyInOrOut = req.body
    const {id} = req.params
    const {authorization} = req.headers
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

    const movimentation = await walletCollection.findOne({_id: ObjectId(id)})
    if(!movimentation){
        res.sendStatus(422)
    }

    req.moneyInOrOut=moneyInOrOut
    req.id=ObjectId(id)

    next()

}