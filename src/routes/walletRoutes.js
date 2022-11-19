import {
    getWallet,
    postMoneyIn,
    postMoneyOut,
  } from "../controllers/walletController.js";
  import {Router} from "express"

const router = Router()

router.post("/wallet/money-in", postMoneyIn);

router.post("/wallet/money-out", postMoneyOut);

router.get("/wallet", getWallet);

export default router;