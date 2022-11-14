import z from "zod";
import { Reference } from "../common/Reference";
import { Appointment } from "./Appointment";
import { Certification } from "./Certification";

export const Career = z.object({
  company: z.string().min(1, "Company cannot be empty"),
  appointment: Appointment,
  skills: z.array(z.string()),
  certs: z.array(Certification),
  references: z.array(Reference),
});
export type CareerType = z.infer<typeof Career>;
