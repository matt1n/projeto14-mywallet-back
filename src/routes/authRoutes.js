import { postSignIn, postSignUp } from "../controllers/authController.js";
import {Router} from "express"
import { signinValidation } from "../middlewares/signinMiddleware.js";
import { signupValidation } from "../middlewares/signupMiddleware.js";

const router = Router()

router.post("/sign-up", signupValidation, postSignUp);

router.post("/sign-in",signinValidation, postSignIn);

export default router;