import {
  deleteInOrOut,
    getWallet,
    postMoneyIn,
    postMoneyOut,
    putInOrOut,
  } from "../controllers/walletController.js";
  import {Router} from "express"
import { authPostInOrOutValidation } from "../middlewares/authPostInOrOutMiddleware.js";
import { authGetInsAndOutsValidation } from "../middlewares/authGetInsAndOutsMiddleware.js";
import { deleteInOrOutValidation } from "../middlewares/deleteInOrOutMiddleware.js";
import { authPutInsAndOutsValidation } from "../middlewares/authPutInsAndOutsMiddleware.js";

const router = Router()

router.get("/wallet", authGetInsAndOutsValidation, getWallet);

router.delete("/wallet/:id", deleteInOrOutValidation, deleteInOrOut)

router.put("/wallet/:id", authPutInsAndOutsValidation, putInOrOut)

router.use(authPostInOrOutValidation)

router.post("/wallet/money-in", postMoneyIn);

router.post("/wallet/money-out", postMoneyOut);

export default router;