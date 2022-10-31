import React from "react";
import "./index.css";
import { useForm } from "react-hook-form";
import { SchemaProfile, SchemaProfileType } from "../../validations/character";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mantine/core";
import mockSearchCharacterNames from "../../mock";
import { debounce } from "lodash";
import Form from "../../components/Form";
import { useNavigate } from "@tanstack/react-location";
import Base from "../../components/Base";

const CreateProfile: React.FC = () => {
  const navigate = useNavigate();
  const methods = useForm<SchemaProfileType>({
    resolver: zodResolver(SchemaProfile),
    mode: "onChange",
    defaultValues: {
      gender: "MALE",
      characterName: "",
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
      <div className="main__container">
        <div>
          <div className="title">Fill in the mandatory fields below</div>
          <Form methods={methods} useLocalStorage={true} preventLeaving={true}>
            <Form.ChipSelection<SchemaProfileType["gender"]>
              selections={["MALE", "FEMALE"]}
              name={"gender"}
              control={control}
              disabled={isSubmitting}
            />
            <Form.TextInput
              disabled={isSubmitting}
              label={"Character Name"}
              control={control}
              name={"characterName"}
              customOnChange={debouncedSearch}
              className={"input"}
              error={
                characterNameError && (
                  <a href={"/profile"}>
                    This name exists, did you mean this person?
                  </a>
                )
              }
              required={true}
            />
            <Form.TextArea
              disabled={isSubmitting}
              name={"bio"}
              label={"Bio for Character"}
              control={control}
              className={"input"}
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
              className={"input"}
              type={"password"}
              required={true}
            />
            <Button
              disabled={!isValid}
              onClick={submitForm}
              className="create__btn"
            >
              Create Character
            </Button>
          </Form>
        </div>
      </div>{" "}
    </Base>
  );
};

export default CreateProfile;
