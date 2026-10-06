import { Router } from "express";
import { uploadPdfAssessment } from "../controllers/assessment/pdf.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { uploadPdf } from "../middleware/upload.middleware.js";

const router = Router();

router.post("/upload", authenticate, authorize("student", "admin"), uploadPdf.single("pdf"), uploadPdfAssessment);

export default router;
