import { Router } from "express";
import { run, submit } from "../controllers/coding/coding.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { runCodeSchema } from "../validators/coding.validator.js";

const router = Router();

router.use(authenticate, authorize("student", "admin"));
router.post("/run", validate(runCodeSchema), run);
router.post("/submit", validate(runCodeSchema), submit);

export default router;
