import z from "zod";
import { Reference } from "./References";

export const Appointment = z.object({
  value: z.object({
    position: z.string(),
    rank: z.string(),
  }),
  references: z.array(Reference),
});
