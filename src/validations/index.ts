import z from "zod";

export const formSchema = z.object({
    job: z.enum(["HERO", "ADVENTURER"]),
    characterName: z.string().min(5, "Minimum 5 characters"),
});

export type FormSchemaType = z.infer<typeof formSchema>;

// TODO:
// Research if zod is meant for form validation or just for schema validation
