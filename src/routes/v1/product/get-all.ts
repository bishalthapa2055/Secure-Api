import { Router } from "express";
import { getAllProductHandler } from "../../../controllers/product/get-all";
import { currentUser } from "../../../common/middlewares/current-user";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { authorization } from "../../../common/middlewares/authorization";
import { validateRequest } from "../../../common/middlewares/validate-request";
import { Role } from "../../../common/types/role";
const router = Router();

router.get(
  "/",
  currentUser, // token verificaiton
  requireAuth, // check if user is valid or not
  authorization([Role.admin, Role.user]), // check id current user is admin or general user
  validateRequest, // expres validator request handler
  getAllProductHandler
);

export { router as getAllProductRouter };
