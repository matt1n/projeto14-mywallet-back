import {
  moneyInOrOutSchema,
  sessionsCollection,
  usersCollection,
  walletCollection,
} from "../index.js";
import dayjs from "dayjs";

export async function postMoneyIn(req, res) {
  const moneyInOrOut = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }

  const { error } = moneyInOrOutSchema.validate(moneyInOrOut, {
    abortEarly: false,
  });
  if (error) {
    const erros = error.details.map((detail) => detail.message);
    return res.status(422).send(erros);
  }

  try {
    const session = await sessionsCollection.findOne({ token });
    const user = await usersCollection.findOne({ _id: session?.userId });
    if (!user) {
      return res.sendStatus(401);
    }

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
  const moneyInOrOut = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }

  const { error } = moneyInOrOutSchema.validate(moneyInOrOut, {
    abortEarly: false,
  });
  if (error) {
    const erros = error.details.map((detail) => detail.message);
    res.status(422).send(erros);
  }

  try {
    const session = await sessionsCollection.findOne({ token });
    const user = await usersCollection.findOne({ _id: session?.userId });
    if (!user) {
      return res.sendStatus(401);
    }

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
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const session = await sessionsCollection.findOne({ token });
    const user = await usersCollection.findOne({ _id: session?.userId });
    if (!user) {
      return res.sendStatus(401);
    }

    const moneyControl = await walletCollection
      .find({ userId: user._id })
      .toArray();
    res.send(moneyControl);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
