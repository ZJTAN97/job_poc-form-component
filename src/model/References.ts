import z from "zod";

export enum TYPES_OF_REFERENCES {
  LINKED_IN = "LINKED_IN",
  FACEBOOK = "FACEBOOK",
  GLASS_DOOR = "GLASSDOOR",
  REDDIT = "REDDIT",
  INDEED = "INDEED",
  TWITTER = "TWITTER",
}

export const Reference = z.object({
  appliedTo: z.string(),
  referenceType: z.nativeEnum(TYPES_OF_REFERENCES),
  dateObtained: z.string(),
  comment: z.string(),
});
