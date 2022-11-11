import z from "zod";

export const REFERENCE_TYPES = z.enum(["LinkedIn", "Glassdoor", "Others"]);

export const SchemaAppointment = z.object({
  position: z.string(),
  rank: z.string(),
});
export type SchemaAppointmentType = z.infer<typeof SchemaAppointment>;

export const SchemaCert = z.object({
  name: z.string(),
  issuedBy: z.string(),
});
export type SchemaCertType = z.infer<typeof SchemaCert>;

export const SchemaReference = z.object({
  field: z.string(),
  content: z.string(),
  dateObtained: z.string(),
  referenceType: REFERENCE_TYPES,
  comments: z.string(),
});
export type SchemaReferenceType = z.infer<typeof SchemaReference>;

export const SchemaCareer = z.object({
  company: z.string().min(1, "Company cannot be empty"),
  appointment: SchemaAppointment,
  skills: z.array(z.string()),
  certs: z.array(SchemaCert),
  references: z.array(SchemaReference),
});
export type SchemaCareerType = z.infer<typeof SchemaCareer>;

// Following is the ideal data structure to represent all cases
export const SampleData = {
  company: "ABC Restaurant",
  appointment: {
    position: "Head Chef",
    rank: "A",
  },
  skills: ["cooking", "coding"],
  certs: [
    {
      name: "Cooking101",
      issuedBy: "Culinary School A",
    },
    {
      name: "Coding101",
      issuedBy: "NUS ISS",
    },
  ],
  references: [
    {
      field: "company",
      content: "ABC Restaurant",
      dateObtained: "12/12/2022",
      referenceType: "Linkedin",
      comments: "",
    },
    {
      field: "appointment.position",
      content: "Head Chef",
      dateObtained: "12/12/2022",
      referenceType: "Linkedin",
      comments: "",
    },
    {
      field: "appointment.rank",
      content: "A",
      dateObtained: "12/12/2022",
      referenceType: "Linkedin",
      comments: "",
    },
    {
      field: "skills",
      content: "cooking",
      dateObtained: "12/12/2022",
      referenceType: "Linkedin",
      comments: "",
    },
    {
      field: "skills",
      content: "coding",
      dateObtained: "12/12/2022",
      referenceType: "Linkedin",
      comments: "",
    },
    {
      field: "certs.name",
      content: "Cooking101",
      dateObtained: "12/12/2022",
      referenceType: "Linkedin",
      comments: "",
    },
    {
      field: "certs.issuedBy",
      content: "Culinary School A",
      dateObtained: "12/12/2022",
      referenceType: "Linkedin",
      comments: "",
    },
    {
      field: "certs.name",
      content: "Coding101",
      dateObtained: "12/12/2022",
      referenceType: "Linkedin",
      comments: "",
    },
    {
      field: "certs.issuedBy",
      content: "NUS ISS",
      dateObtained: "12/12/2022",
      referenceType: "Linkedin",
      comments: "",
    },
  ],
};
