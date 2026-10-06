import { api } from "./api";

export const studyPlanService = {
  generate: (payload) => api.post("/studyplan/generate", payload).then((res) => res.data.plan)
};
