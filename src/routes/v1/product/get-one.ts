import { Router } from "express";
import { getOneProductHandler } from "../../../controllers/product/get-one";
import { param } from "express-validator";
import { isValidObjectId } from "../../../services/object-id-validates";
import { validateRequest } from "../../../common/middlewares/validate-request";
import { currentUser } from "../../../common/middlewares/current-user";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { authorization } from "../../../common/middlewares/authorization";
import { Role } from "../../../common/types/role";

const router = Router();

router.get(
  "/:id",
  currentUser,
  requireAuth,
  authorization([Role.admin, Role.user]),
  [
    param("id")
      .notEmpty()
      .custom((id) => isValidObjectId(id))
      .withMessage("Invalid Id"),
  ],
  validateRequest,
  getOneProductHandler
);

export { router as getOneProductRouter };
