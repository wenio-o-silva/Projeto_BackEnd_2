import { Router } from "express";
import QuartoController from "../controllers/QuartoController.js";

const router = Router();

router.post("/", QuartoController.create);
router.get("/", QuartoController.index);
router.put("/:id", QuartoController.update);
router.delete("/:id", QuartoController.delete);

export default router;