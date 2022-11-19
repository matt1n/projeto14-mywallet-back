import { postSignIn, postSignUp } from "../controllers/authController.js";
import {Router} from "express"

const router = Router()

router.post("/sign-up", postSignUp);

router.post("/sign-in", postSignIn);

export default router;