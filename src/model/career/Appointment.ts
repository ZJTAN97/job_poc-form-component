import z from "zod";
import { Reference } from "../common/Reference";

export const Appointment = z.object({
  position: z.string().min(1, "Position cannot be empty"),
  rank: z.string().min(1, "Rank cannot be empty"),
  references: z.array(Reference),
});

export type AppointmentType = z.infer<typeof Appointment>;
