import { api } from "./api";

export const assessmentService = {
  generate: (payload) => api.post("/assessment/generate", payload).then((res) => res.data.assessment),
  generateAdaptive: (payload) => api.post("/assessment/adaptive", payload).then((res) => res.data.assessment),
  history: () => api.get("/assessment/history").then((res) => res.data.assessments),
  submit: (payload) => api.post("/assessment/submit", payload).then((res) => res.data.submission),
  evaluateTheory: (payload) => api.post("/assessment/evaluate-theory", payload).then((res) => res.data.evaluation),
  uploadPdf: (formData) => api.post("/pdf/upload", formData, { headers: { "Content-Type": "multipart/form-data" } }).then((res) => res.data.assessment)
};
