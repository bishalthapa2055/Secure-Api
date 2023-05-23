import { Router } from "express";
import { getAllPaymentRouter } from "./get-all";
import { getOnePaymentRouter } from "./get-one";

const router = Router();


router.use(getAllPaymentRouter);
router.use(getOnePaymentRouter);


export {router as indexPaymentRouter}