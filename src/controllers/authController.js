import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { usersCollection, sessionsCollection } from "../database/db.js";

export async function postSignUp(req, res) {

  const body = res.locals.body

  const passwordHash = bcrypt.hashSync(body.password, 10);

  try {
    await usersCollection.insertOne({ ...body, password: passwordHash });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postSignIn(req, res) {
  const token = uuid();
  const user = req.user
  try {

    await sessionsCollection.insertOne({
      userId: user._id,
      token,
    });

    res.send({ token, username: user.name });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
