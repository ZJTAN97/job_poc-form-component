import React from "react";
import styles from "./index.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mantine/core";
import { debounce } from "lodash";
import { useNavigate } from "@tanstack/react-location";
import { Base } from "../../components/Base";
import { Form } from "../../components/Form";
import { Employee, EmployeeType } from "../../model/employee/Employee";
import { mockSearchEmployee } from "../../api/mock";

export const CreateEmployee = () => {
  const navigate = useNavigate();
  const methods = useForm<EmployeeType>({
    resolver: zodResolver(Employee),
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

  const { formState, handleSubmit } = methods;
  const { isValid, isSubmitting } = formState;

  const [characterNameError, setCharacterNameError] = React.useState("");

  const debouncedSearch = debounce((criteria: string) => {
    mockSearchEmployee(criteria, setCharacterNameError);
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
            <Form.ChipSelection<EmployeeType, EmployeeType["gender"]>
              selections={["MALE", "FEMALE"]}
              name={"gender"}
              disabled={isSubmitting}
            />
            <Form.TextInput
              disabled={isSubmitting}
              label={"Employee Name"}
              name={"employeeName"}
              onChange={debouncedSearch}
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
              className={styles.input}
            />
            <Form.TextInput
              disabled={isSubmitting}
              label={"Password"}
              name={"password"}
              className={"input"}
              type={"password"}
              required={true}
            />
            <Form.TextInput
              disabled={isSubmitting}
              label={"Confirm Password"}
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
