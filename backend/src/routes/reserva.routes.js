import { Router } from "express";
import ReservaController from "../controllers/ReservaController.js";

const router = Router();

router.post("/", ReservaController.create);
router.get("/", ReservaController.index);
router.put("/:id", ReservaController.update);
router.delete("/:id", ReservaController.delete);

export default router;