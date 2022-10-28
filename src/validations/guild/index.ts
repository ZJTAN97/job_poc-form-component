import z from "zod";

export const sourceOfDataSchema = z.object({
  appliedTo: z.string(),
  type: z.enum(["NEXON", "ASIASOFT"]),
});

export type SourceOfDataSchemaType = z.infer<typeof sourceOfDataSchema>;

export const guildFormSchema = z.object({
  guild: z.string(),
  alliance: z.string(),
  sourceOfData: z.array(sourceOfDataSchema),
});

export type GuildFormSchemaType = z.infer<typeof guildFormSchema>;
