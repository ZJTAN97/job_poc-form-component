import z from "zod";

export const formSchema = z.object({
  job: z.enum(["HERO", "ADVENTURER"]),
  characterName: z.string(),
});

export type FormSchemaType = z.infer<typeof formSchema>;
