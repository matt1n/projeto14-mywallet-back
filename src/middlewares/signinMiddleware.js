import { usersCollection } from "../database/db.js";
import { signInSchema } from "../models/signinSchema.js";
import bcrypt from "bcrypt";


export async function signinValidation(req, res, next){
    const { email, password } = req.body;

    const { error } = signInSchema.validate(
        { email, password },
        { abortEarly: false }
      );
      if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(401).send(errors);
      }

      const user = await usersCollection.findOne({ email });
      if (!user) {
        return res.status(401).send("E-mail não cadrastrado");
      }

      const rightPassword = bcrypt.compareSync(password, user.password);
    if (!rightPassword) {
      return res.status(401).send("Senha incorreta");
    }

    req.user = user

    next()
}