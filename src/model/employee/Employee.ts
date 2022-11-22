import z from "zod";

const BaseEmployee = z
  .object({
    bio: z.string().min(10, "Minimally 10 characters long"),
    dateCreated: z.date(),
    password: z
      .string()
      .min(6, "Password needs to be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine(
    async (baseSchema) => baseSchema.password === baseSchema.confirmPassword,
    {
      message: "Passwords dont match",
      path: ["confirm"],
    },
  );

const Male = z.object({
  gender: z.literal("MALE"),
  employeeName: z.string().min(5, "Male requires at least 5 characters"),
});

const Female = z.object({
  gender: z.literal("FEMALE"),
  employeeName: z.string().min(8, "Female requires at least 8 characters"),
});

export const Employee = z.union([Male, Female]).and(BaseEmployee); // extends base schema

export type EmployeeType = z.infer<typeof Employee>;
