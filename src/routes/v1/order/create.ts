import { Router } from "express";
import { createOrderHandler } from "../../../controllers/order/create";
import { currentUser } from "../../../common/middlewares/current-user";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { authorization } from "../../../common/middlewares/authorization";
import { Role } from "../../../common/types/role";
import { validateRequest } from "../../../common/middlewares/validate-request";

const router = Router();

router.post(
  "/",
  currentUser,
  requireAuth,
  authorization([Role.user]),
  validateRequest,
  createOrderHandler
);

export { router as createOrderRouter };
