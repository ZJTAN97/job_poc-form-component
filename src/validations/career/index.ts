import z from "zod";

export const SAUCE_TYPES = z.enum(["Ketchup", "Chilli", "Mustard"]);
export const SAUCE_PACKAGE = z.enum(["Packet", "Tub", "Bottle"]);

export const SchemaSAUCE = z.object({
    appliedTo: z.array(z.string()),
    dateObtained: z.date(),
    sauceType: SAUCE_TYPES,
    saucePackage: SAUCE_PACKAGE,
    serial: z.string(),
    comments: z.string(),
});

export type SchemaSOIType = z.infer<typeof SchemaSAUCE>;

export const SchemaCareer = z.object({
    company: z.string().min(1, "Company cannot be empty"),
    position: z.string().min(1, "Position cannot be empty"),
    duration: z.string().min(1, "Duration cannot be empty"),
    lastDrawnSalary: z.string(),
    skills: z.array(z.string()),
    sauce: z.array(SchemaSAUCE),
});

export type SchemaCareerType = z.infer<typeof SchemaCareer>;
