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
  certs: z.array(Certification).min(1, "Minimally 1 certification"),
  references: z.array(Reference),
});
// .superRefine((data, context) => {
//   const requiredRefSingle = ["company", "skills"];
//   const providedRefSingle = data.references.map((item) => item.field);

//   // 1. Check if fields with required references are filled up
//   const unfulfilledRefs = requiredRefSingle.filter(
//     (ref) => !providedRefSingle.includes(ref),
//   );
//   if (unfulfilledRefs.length > 0) {
//     context.addIssue({
//       path: ["references_error"],
//       code: z.ZodIssueCode.custom,
//       message: `${unfulfilledRefs} references is required.`,
//     });
//   }

//   data.references.forEach((ref) => {
//     const careerField = data[ref.field as keyof typeof data];
//     // 2. For array type fields, check if all has references
//     if (Array.isArray(careerField)) {
//       const filtered = data.references
//         .filter((item) => item.field === ref.field)
//         .map((item) => item.content);
//       if (JSON.stringify(filtered) !== JSON.stringify(careerField)) {
//         context.addIssue({
//           path: ["references_error"],
//           message: `${ref.field} references required for all`,
//           code: z.ZodIssueCode.custom,
//         });
//       }
//     }
//   });
// });

export type CareerType = z.infer<typeof Career>;
