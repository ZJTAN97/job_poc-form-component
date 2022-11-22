import z from "zod";

export const Appointment = z.object({
  position: z.string().min(1, "Position cannot be empty"),
  rank: z.string().min(1, "Rank cannot be empty"),
});

export type AppointmentType = z.infer<typeof Appointment>;
