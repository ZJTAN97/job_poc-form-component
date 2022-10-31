import z from "zod";

const SOI_TYPES = z.enum(["type1", "type2", "type3"]);
const SOI_SUB_TYPES = z.enum(["subtype1", "subtype2", "subtype3"]);

export const SchemaSOI = z.object({
  dateObtained: z.date(),
  sourceType: SOI_TYPES,
  sourceSubType: SOI_SUB_TYPES,
  serial: z.string(),
  comments: z.string(),
});

export type SchemaSOIType = z.infer<typeof SchemaSOI>;

export const SchemaCareer = z.object({
  company: z.string(),
  position: z.string(),
  duration: z.number(),
  soi: z.array(SchemaSOI),
});

export type SchemaCareerType = z.infer<typeof SchemaCareer>;
