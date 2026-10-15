import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes.js";
import assessmentRoutes from "./routes/assessment.routes.js";
import pdfRoutes from "./routes/pdf.routes.js";
import codingRoutes from "./routes/coding.routes.js";
import studyPlanRoutes from "./routes/studyplan.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

const app = express();
const allowedOrigins = new Set([
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://smart-study-gxq3lgb0v-sagar9905.vercel.app"
].filter(Boolean));

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 250, standardHeaders: true, legacyHeaders: false }));

app.get("/health", (_req, res) => res.json({ status: "ok", service: "smartstudy-ai" }));

app.use("/auth", authRoutes);
app.use("/assessment", assessmentRoutes);
app.use("/pdf", pdfRoutes);
app.use("/coding", codingRoutes);
app.use("/studyplan", studyPlanRoutes);
app.use("/analytics", analyticsRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
