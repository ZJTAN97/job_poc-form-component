import z from "zod";
import { Reference } from "../common/Reference";
import { Appointment } from "./Appointment";
import { Certification } from "./Certification";

export const Career = z.object({
  company: z.string().min(1, "Company cannot be empty"),
  appointment: Appointment,
  skills: z
    .string()
    .array()
    .min(1, "Minimally 1 skill")
    .superRefine((val, ctx) => {
      if (val.length !== new Set(val).size) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "No duplicates allowed. 😡",
        });
      }
    }),
  duration: z.string(),
  lastDrawnSalary: z.string(),
  certsToField: z.array(Certification).min(1, "Minimally 1 certification"),
  references: z.array(Reference),
});

export type CareerType = z.infer<typeof Career>;
