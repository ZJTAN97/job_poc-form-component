import z from "zod";
import { Reference } from "../common/Reference";

export const Certification = z.object({
  name: z.string().min(1, "Name of certificate cannot be empty"),
  issuedBy: z.string().min(1, "Issuer cannot be empty"),
  references: z.array(Reference).optional(),
});

export type CertificationType = z.infer<typeof Certification>;
