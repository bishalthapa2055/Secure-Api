import { Router } from "express";
import { createProductHandler } from "../../../controllers/product/create";

const router = Router();

router.post("/", createProductHandler);

export { router as createProductRouter };
