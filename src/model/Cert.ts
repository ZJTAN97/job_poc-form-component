import z from "zod";
import { Reference } from "./References";

export const Cert = z.object({
  value: z.object({
    name: z.string(),
    issuedBy: z.string(),
  }),
  references: z.array(Reference),
});
