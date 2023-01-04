import z from "zod";
import { Appointment } from "./Appointment";
import { Cert } from "./Cert";
import { Company } from "./Company";
import { Skill } from "./Skill";

export const Career = z.object({
  company: Company,
  appointment: Appointment,
  skills: z.array(Skill),
  certs: z.array(Cert),
});

export type CareerType = z.infer<typeof Career>;
