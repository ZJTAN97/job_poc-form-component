import z from "zod";

export const formSchema = z.object({
  firstName: z
    .string()
    .min(3, "Minimum length of 3 characters")
    .max(10, "Maximum length of 10 characters")
    .refine(
      async (value) => value.charAt(0) === value.charAt(0).toUpperCase(),
      "First name first character has to be captialized"
    ),
  lastName: z
    .string()
    .min(3, "Minimum length of 3 characters")
    .refine(
      async (value) => value.charAt(0) === value.charAt(0).toUpperCase(),
      "Last name first character has to be captialized"
    ),
  agreement: z.literal(true, {
    invalid_type_error: "You must accept Terms and Conditions.",
  }),
});

export type FormSchemaType = z.infer<typeof formSchema>;
