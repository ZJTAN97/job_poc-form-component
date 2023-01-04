import z from "zod";
import { Reference } from "./References";

export const Skill = z.object({
  value: z.object({
    skill: z.string(),
  }),
  references: z.array(Reference),
});
