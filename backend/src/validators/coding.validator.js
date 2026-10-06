import { z } from "zod";

export const runCodeSchema = z.object({
  body: z.object({
    language: z.enum(["java", "cpp"]),
    code: z.string().min(1),
    stdin: z.string().optional().default("")
  })
});
