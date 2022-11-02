import z from "zod";

const SOI_TYPES = z.enum(["Bird", "Cat", "Dog"]);
const SOI_SUB_TYPES = z.enum(["Sub-Bird", "Sub-Cat", "Sub-Dog"]);

export const SchemaSOI = z.object({
  appliedTo: z.array(z.string()),
  dateObtained: z.date(),
  sourceType: SOI_TYPES,
  sourceSubType: SOI_SUB_TYPES,
  serial: z.string(),
  comments: z.string(),
});

export type SchemaSOIType = z.infer<typeof SchemaSOI>;

export const SchemaCareer = z.object({
  company: z.string().min(1, "Company cannot be empty"),
  position: z.string().min(1, "Position cannot be empty"),
  duration: z.string().min(1, "Duration cannot be empty"),
  soi: z.array(SchemaSOI),
});

export type SchemaCareerType = z.infer<typeof SchemaCareer>;
