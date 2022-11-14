import z from "zod";

export const Appointment = z.object({
  position: z.string(),
  rank: z.string(),
});

export type AppointmentType = z.infer<typeof Appointment>;
