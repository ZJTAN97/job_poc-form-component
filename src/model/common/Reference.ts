import z from "zod";
import { Source } from "./Source";

export const Reference = z.object({
  field: z.string(),
  content: z.string(),
  sources: z.array(Source),
});
export type ReferenceType = z.infer<typeof Reference>;
