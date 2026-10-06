import { Router } from "express";
import { generate } from "../controllers/studyplan/studyplan.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { studyPlanSchema } from "../validators/studyplan.validator.js";

const router = Router();

router.post("/generate", authenticate, authorize("student", "admin"), validate(studyPlanSchema), generate);

export default router;
