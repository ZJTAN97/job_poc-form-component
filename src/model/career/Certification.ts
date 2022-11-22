import z from "zod";
import { Reference } from "../common/Reference";

export const Certification = z.object({
  name: z.string(),
  issuedBy: z.string(),
  references: z.array(Reference),
});

export type CertificationType = z.infer<typeof Certification>;
