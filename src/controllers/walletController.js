import {
  walletCollection,
} from "../database/db.js";
import dayjs from "dayjs";

export async function postMoneyIn(req, res) {
  const user =req.user
  const moneyInOrOut = req.moneyInOrOut
  try {
    await walletCollection.insertOne({
      ...moneyInOrOut,
      date: dayjs().format("DD/MM"),
      type: "money-in",
      userId: user._id,
    });

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postMoneyOut(req, res) {
  const user = req.user
  const moneyInOrOut = req.moneyInOrOut
  try {
    await walletCollection.insertOne({
      ...moneyInOrOut,
      date: dayjs().format("DD/MM"),
      type: "money-out",
      userId: user._id,
    });

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getWallet(req, res) {
  
  const user = req.user

  try {
    const moneyControl = await walletCollection
      .find({ userId: user._id })
      .toArray();
    res.send(moneyControl);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function deleteInOrOut(req,res) {
  const id = req.id

  try{
    await walletCollection.deleteOne({_id: id})
    res.sendStatus(200)

  }catch(err){
    console.log(err)
    res.sendStatus(500)
  }

}

export async function putInOrOut(req,res) {
  const id = req.id
  const moneyInOrOut = req.moneyInOrOut
  try{
    await walletCollection.updateOne({_id:id}, {$set: moneyInOrOut})
    res.sendStatus(200);
  }catch(err){
    console.log(err)
    res.sendStatus(500)
  }
}