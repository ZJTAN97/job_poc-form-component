import z from "zod";

export const Certification = z.object({
  name: z.string(),
  issuedBy: z.string(),
});

export type CertificationType = z.infer<typeof Certification>;
