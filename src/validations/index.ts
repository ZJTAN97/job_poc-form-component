import z from "zod";

const baseSchema = z
    .object({
        bio: z.string().min(10, "Minimally 10 characters long"),
        dateCreated: z.date(),
        password: z
            .string()
            .min(6, "Password needs to be at least 6 characters long"),
        confirmPassword: z.string(),
    })
    .refine(
        async (baseSchema) =>
            baseSchema.password === baseSchema.confirmPassword,
        {
            message: "Passwords dont match",
            path: ["confirm"],
        }
    );

const formSchemaHero = z.object({
    job: z.literal("HERO"),
    characterName: z.string().optional(),
});

const formSchemaAdventurer = z.object({
    job: z.literal("ADVENTURER"),
    characterName: z.string().min(5, "require at least 5 characters"),
});

const formSchemaResistance = z.object({
    job: z.literal("RESISTANCE"),
    characterName: z.string().min(8, "require at least 8 characters"),
});

export const formSchema = z
    .union([formSchemaHero, formSchemaAdventurer, formSchemaResistance])
    .and(baseSchema); // extends base schema

export type FormSchemaType = z.infer<typeof formSchema>;
