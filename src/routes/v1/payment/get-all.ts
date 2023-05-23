import { Router } from "express";
import { getAllPaymentHandler } from "../../../controllers/payment/get-all";
import { currentUser } from "../../../common/middlewares/current-user";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { authorization } from "../../../common/middlewares/authorization";
import { Role } from "../../../common/types/role";
import { validateRequest } from "../../../common/middlewares/validate-request";




const router = Router();

router.get("/",currentUser , requireAuth , authorization([Role.admin]), validateRequest, getAllPaymentHandler);

export {router as getAllPaymentRouter}