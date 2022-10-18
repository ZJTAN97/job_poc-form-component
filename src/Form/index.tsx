import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mantine/core";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formSchema, FormSchemaType } from "../validations";
import FormInput from "./FormInput";

interface FormProps {}

const Form: React.FC<FormProps> = () => {
  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  // https://react-hook-form.com/api/formprovider

  const { watch, formState, handleSubmit, control } = methods;
  const { isDirty, isValid, isSubmitting } = formState;

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <FormInput name="firstName" label="First Name" />
      <br></br>
      <FormInput name="lastName" label="Last Name" />
      <br></br>
      <Button
        color={"blue"}
        size={"sm"}
        loading={isSubmitting}
        onClick={() => console.log("submitting..")}
      >
        Submit
      </Button>
    </FormProvider>
  );
};

export default Form;
