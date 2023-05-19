import { Router } from "express";
import { currentUser } from "../../../common/middlewares/current-user";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { authorization } from "../../../common/middlewares/authorization";
import { Role } from "../../../common/types/role";
import { validateRequest } from "../../../common/middlewares/validate-request";
import { getOneOrderHandler } from "../../../controllers/order/get-one";
import { param } from "express-validator";
import { isValidObjectId } from "../../../services/object-id-validates";

const router = Router();

router.get("/:id", currentUser , requireAuth , authorization([Role.user]),
[
    param("id").notEmpty().custom((id) =>  isValidObjectId(id)).withMessage("Invalid Id")
]

,validateRequest , getOneOrderHandler)


export {router as getOneOrderRouter}