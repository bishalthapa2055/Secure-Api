import { Router } from "express";
import { getAllPaymentRouter } from "./get-all";
import { getOnePaymentRouter } from "./get-one";
import { deletePaymentRouter } from "./delete";

const router = Router();


router.use(getAllPaymentRouter);
router.use(getOnePaymentRouter);
router.use(deletePaymentRouter)


export {router as indexPaymentRouter}