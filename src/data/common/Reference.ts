import z from "zod";

export enum TYPES_OF_REFERENCES {
  LINKED_IN = "Linkedin",
  FACEBOOK = "Facebook",
  GLASS_DOOR = "Glassdoor",
  REDDIT = "Reddit",
  INDEED = "Indeed",
  TWITTER = "Twitter",
}

export function GetReferenceTypeKey(value: string) {
  const indexOfValue = Object.values(TYPES_OF_REFERENCES).indexOf(
    value as unknown as TYPES_OF_REFERENCES,
  );
  const key = Object.keys(TYPES_OF_REFERENCES)[indexOfValue];
  return key as TYPES_OF_REFERENCES;
}

export const Reference = z.object({
  field: z.string(),
  content: z.string(),
  dateObtained: z.string(),
  referenceType: z.nativeEnum(TYPES_OF_REFERENCES),
  comments: z.string(),
});
export type ReferenceType = z.infer<typeof Reference>;
