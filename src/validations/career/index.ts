import z from "zod";

export const REFERENCE_TYPES = z.enum(["LinkedIn", "Glassdoor", "Others"]);

export const SchemaReference = z.object({
  appliedTo: z.string(),
  dateObtained: z.string(),
  referenceType: REFERENCE_TYPES,
  comments: z.string(),
});

export type SchemaReferenceType = z.infer<typeof SchemaReference>;

export const SchemaCareer = z.object({
  company: z.string().min(1, "Company cannot be empty"),
  position: z.string().min(1, "Intern is also an position bro."),
  duration: z.string().min(1, "Duration cannot be empty"),
  lastDrawnSalary: z.string().min(1, "How can the person not be paid?"),
  skills: z.array(z.string()),
  certs: z.array(z.string()),
  references: z.array(SchemaReference),
});

export type SchemaCareerType = z.infer<typeof SchemaCareer>;
