import z from "zod";

export const baseSchema = z.object({
  bio: z.string().min(10, "Minimally 10 character"),
  dateCreated: z.date(),
});

export const formSchemaHero = z.object({
  job: z.literal("HERO"),
  characterName: z.string().optional(),
});

export const formSchemaAdventurer = z.object({
  job: z.literal("ADVENTURER"),
  characterName: z.string().min(5, "require at least 5 characters"),
});

export const formSchema = z
  .union([formSchemaHero, formSchemaAdventurer])
  .and(baseSchema); // extends base schema

export type FormSchemaType = z.infer<typeof formSchema>;
