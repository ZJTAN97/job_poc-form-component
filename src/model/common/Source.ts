import z from "zod";

export enum TYPES_OF_REFERENCES {
  LINKED_IN = "LINKED_IN",
  FACEBOOK = "FACEBOOK",
  GLASS_DOOR = "GLASSDOOR",
  REDDIT = "REDDIT",
  INDEED = "INDEED",
  TWITTER = "TWITTER",
}

export function GetReferenceTypeKey(value: string) {
  const indexOfValue = Object.values(TYPES_OF_REFERENCES).indexOf(
    value as unknown as TYPES_OF_REFERENCES,
  );
  const key = Object.keys(TYPES_OF_REFERENCES)[indexOfValue];
  return key as TYPES_OF_REFERENCES;
}

export const Source = z.object({
  dateObtained: z.string(),
  referenceType: z.nativeEnum(TYPES_OF_REFERENCES),
  comment: z.string().min(1, "Comment cannot be empty"),
});

export type SourceType = z.infer<typeof Source>;
