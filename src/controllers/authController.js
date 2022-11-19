import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { signInSchema, signUpSchema, moneyInOrOutSchema } from "../index.js";
import { usersCollection, sessionsCollection } from "../database/db.js";

export async function postSignUp(req, res) {
  const body = req.body;

  const { error } = signUpSchema.validate(body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    res.status(422).send(errors);
    return;
  }

  const { email } = body;
  const emailValidation = await usersCollection.findOne({ email });
  if (emailValidation) {
    res.status(401).send("This email has already been declared!");
    return;
  }

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
  const { email, password } = req.body;
  const token = uuid();
  try {
    const user = await usersCollection.findOne({ email });
    console.log(user);

    const { error } = signInSchema.validate(
      { email, password },
      { abortEarly: false }
    );
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(401).send(errors);
    }

    if (!user) {
      return res.status(401).send("E-mail não cadrastrado");
    }

    const rightPassword = bcrypt.compareSync(password, user.password);
    if (!rightPassword) {
      return res.status(401).send("Senha incorreta");
    }

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
