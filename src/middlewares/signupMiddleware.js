import { usersCollection } from "../database/db.js";
import { signUpSchema } from "../models/signupSchema.js";

export async function signupValidation(req,res,next){
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

    res.locals.body = body

    next()
}