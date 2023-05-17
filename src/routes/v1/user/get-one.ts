import { Router } from "express";
import { currentUser } from "../../../common/middlewares/current-user";
import { requireAuth } from "../../../common/middlewares/require-auth";
import { authorization } from "../../../common/middlewares/authorization";
import { Role } from "../../../common/types/role";
import { validateRequest } from "../../../common/middlewares/validate-request";
import { getOneUserHandler } from "../../../controllers/user/get-one";




const router = Router()


router.get("/:id" , currentUser , requireAuth , authorization([Role.admin]) , validateRequest , getOneUserHandler)




export {router as getOneUserRouter}