import { api } from "./api";

export const analyticsService = {
  student: () => api.get("/analytics/student").then((res) => res.data.analytics),
  admin: () => api.get("/analytics/admin").then((res) => res.data.analytics)
};
