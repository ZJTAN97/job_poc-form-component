import z from "zod";

const baseSchema = z
    .object({
        bio: z.string().min(10, "Minimally 10 character"),
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

export const formSchema = z
    .union([formSchemaHero, formSchemaAdventurer])
    .and(baseSchema); // extends base schema

export type FormSchemaType = z.infer<typeof formSchema>;
