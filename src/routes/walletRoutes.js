import {
    getWallet,
    postMoneyIn,
    postMoneyOut,
  } from "../controllers/walletController.js";
  import {Router} from "express"
import { authPostInOrOutValidation } from "../middlewares/authPostInOrOutMiddleware.js";
import { authGetInsAndOutsValidation } from "../middlewares/authGetInsAndOutsMiddleware.js";

const router = Router()

router.get("/wallet", authGetInsAndOutsValidation, getWallet);

router.use(authPostInOrOutValidation)

router.post("/wallet/money-in", postMoneyIn);

router.post("/wallet/money-out", postMoneyOut);

export default router;