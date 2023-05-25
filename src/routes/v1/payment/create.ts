import { Router } from "express";
import { currentUser } from "../../../common/middlewares/current-user";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { authorization } from "../../../common/middlewares/authorization";
import { Role } from "../../../common/types/role";
import { validateRequest } from "../../../common/middlewares/validate-request";
import { createPaymentHandler } from "../../../controllers/payment/create";



const router = Router();

router.post("/", currentUser, requireAuth , authorization([Role.admin , Role.user]), validateRequest , createPaymentHandler);


export{ router as createPaymentRouter}