import { Router } from "express";
import { createOrderRouter } from "./create";

const router = Router();

router.use(createOrderRouter);

export { router as indexOrderRouter };
