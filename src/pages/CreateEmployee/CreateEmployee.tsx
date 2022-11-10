import React from "react";
import styles from "./index.module.css";
import { useForm } from "react-hook-form";
import { SchemaEmployee, SchemaEmployeeType } from "../../validations/employee";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mantine/core";
import mockSearchCharacterNames from "../../mock";
import { debounce } from "lodash";
import Form from "../../components/Form";
import { useNavigate } from "@tanstack/react-location";
import { Base } from "../../components/Base";

export const CreateEmployee = () => {
  const navigate = useNavigate();
  const methods = useForm<SchemaEmployeeType>({
    resolver: zodResolver(SchemaEmployee),
    mode: "onChange",
    defaultValues: {
      gender: "MALE",
      employeeName: "",
      bio: "",
      dateCreated: new Date(),
      password: "",
      confirmPassword: "",
    },
  });

  const { formState, handleSubmit, control } = methods;
  const { isValid, isSubmitting } = formState;

  const [characterNameError, setCharacterNameError] = React.useState("");

  const debouncedSearch = debounce((criteria: string) => {
    mockSearchCharacterNames(criteria, setCharacterNameError);
  }, 500);

  const submitForm = handleSubmit(async (data) => {
    navigate({ to: "/profile", replace: true });
    console.log(data);
  });

  return (
    <Base>
      <div className={styles.main__container}>
        <div>
          <div className={styles.title}>Fill in the mandatory fields below</div>
          <Form methods={methods} useLocalStorage={true} preventLeaving={true}>
            <Form.ChipSelection<SchemaEmployeeType["gender"]>
              selections={["MALE", "FEMALE"]}
              name={"gender"}
              control={control}
              disabled={isSubmitting}
            />
            <Form.TextInput
              disabled={isSubmitting}
              label={"Employee Name"}
              control={control}
              name={"employeeName"}
              customOnChange={debouncedSearch}
              className={styles.input}
              error={
                characterNameError && (
                  <a href={"/profile"}>Did you mean this employee?</a>
                )
              }
              required={true}
            />
            <Form.TextArea
              disabled={isSubmitting}
              name={"bio"}
              label={"Bio for Employee"}
              control={control}
              className={styles.input}
            />
            <Form.TextInput
              disabled={isSubmitting}
              label={"Password"}
              control={control}
              name={"password"}
              className={"input"}
              type={"password"}
              required={true}
            />
            <Form.TextInput
              disabled={isSubmitting}
              label={"Confirm Password"}
              control={control}
              name={"confirmPassword"}
              className={styles.input}
              type={"password"}
              required={true}
            />
            <Button
              disabled={!isValid}
              onClick={submitForm}
              className={styles.create__btn}
            >
              Create Employee
            </Button>
          </Form>
        </div>
      </div>{" "}
    </Base>
  );
};
