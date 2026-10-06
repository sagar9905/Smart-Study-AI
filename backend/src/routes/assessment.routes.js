import { Router } from "express";
import { adaptive, evaluateTheory, generate, history, submit } from "../controllers/assessment/assessment.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { evaluateTheorySchema, generateAssessmentSchema, submitAssessmentSchema } from "../validators/assessment.validator.js";

const router = Router();

router.use(authenticate, authorize("student", "admin"));
router.post("/generate", validate(generateAssessmentSchema), generate);
router.post("/adaptive", adaptive);
router.get("/history", history);
router.post("/submit", validate(submitAssessmentSchema), submit);
router.post("/evaluate-theory", validate(evaluateTheorySchema), evaluateTheory);

export default router;
