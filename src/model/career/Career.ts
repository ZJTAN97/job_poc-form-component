import z from "zod";
import { Reference } from "../common/Reference";
import { Appointment } from "./Appointment";
import { Certification } from "./Certification";

export const Career = z
  .object({
    id: z.string().optional(),
    company: z.string().min(1, "Company cannot be empty"),
    appointment: Appointment,
    skills: z
      .string()
      .array()
      .min(1, "A career must have at least one skill 😡")
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
    certsToField: z.array(Certification),
    references: z.array(Reference),
  })
  .superRefine((val, ctx) => {
    /** Validating Company */
    if (
      val.company.length > 0 &&
      val.references.filter((ref) => ref.field === "company").length === 0
    ) {
      ctx.addIssue({
        path: ["references_company"],
        code: z.ZodIssueCode.custom,
        message: "Company requires references 😡",
      });
    }

    /** Validating Appointment Position */
    if (
      val.appointment.position.length > 0 &&
      val.appointment.references.filter((ref) => ref.field === "position")
        .length === 0
    ) {
      ctx.addIssue({
        path: ["references_position"],
        code: z.ZodIssueCode.custom,
        message: "Position requires references 😡",
      });
    }

    /** Validating Skills */
    if (
      val.skills.length !==
      val.references.filter((ref) => ref.field === "skills").length
    ) {
      ctx.addIssue({
        path: ["references_skills"],
        code: z.ZodIssueCode.custom,
        message: "All skills require references 😡",
      });
    }

    /** Validating Certs */
    if (val.certsToField.length > 0) {
      val.certsToField.forEach((certs) => {
        if (certs.references.length !== 2) {
          ctx.addIssue({
            path: ["references_certs"],
            code: z.ZodIssueCode.custom,
            message: "All certification fields require references 😡",
          });
        }
      });
    }
  });

export type CareerType = z.infer<typeof Career>;
