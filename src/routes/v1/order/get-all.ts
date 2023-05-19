import { Router } from "express";
import { currentUser } from "../../../common/middlewares/current-user";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { authorization } from "../../../common/middlewares/authorization";
import { Role } from "../../../common/types/role";
import { validateRequest } from "../../../common/middlewares/validate-request";
import { getAllOrdersHandlers } from "../../../controllers/order/get-all";


const router = Router();

router.get("/", currentUser , requireAuth , authorization([Role.user]), validateRequest , getAllOrdersHandlers)


export  { router as getAllOrderRouter}