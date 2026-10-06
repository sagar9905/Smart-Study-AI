import { Router } from "express";
import { admin, student } from "../controllers/analytics/analytics.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/student", authenticate, authorize("student", "admin"), student);
router.get("/admin", authenticate, authorize("admin"), admin);

export default router;
