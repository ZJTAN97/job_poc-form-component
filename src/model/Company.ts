import z from "zod";
import { Reference } from "./References";

export const Company = z.object({
  value: z.object({
    company: z.string(),
  }),
  references: z.array(Reference),
});

export type CompanyType = z.infer<typeof Company>;
