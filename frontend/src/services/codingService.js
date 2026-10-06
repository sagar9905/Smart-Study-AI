import { api } from "./api";

export const codingService = {
  run: (payload) => api.post("/coding/run", payload).then((res) => res.data.result),
  submit: (payload) => api.post("/coding/submit", payload).then((res) => res.data.result)
};
