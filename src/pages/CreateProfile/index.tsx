import React from "react";
import "./index.css";
import { useForm, useController } from "react-hook-form";
import { FormSchemaType, formSchema } from "../../validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Chip, Textarea } from "@mantine/core";
import mockSearchCharacterNames from "../../mock";
import { debounce } from "lodash";
import CesForm from "../../components/CesForm";
import { useNavigate } from "@tanstack/react-location";

const CreateProfile: React.FC = () => {
  const navigate = useNavigate();
  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      job: "HERO",
      characterName: "",
      bio: "",
      dateCreated: new Date(),
    },
  });

  const { formState, handleSubmit, control, reset } = methods;
  const { isDirty, isValid, isSubmitting } = formState;

  const { field: jobField } = useController({
    name: "job",
    control,
  });
  const { field: characterNameField } = useController({
    name: "characterName",
    control,
  });
  const { field: bioField } = useController({
    name: "bio",
    control,
  });

  const [characterNameError, setCharacterNameError] = React.useState("");

  const debouncedSearch = debounce((criteria: string) => {
    mockSearchCharacterNames(criteria, setCharacterNameError);
  }, 500);

  const switchJobType = (jobType: FormSchemaType["job"]) => {
    characterNameField.onChange("");
    bioField.onChange("");
    jobField.onChange(jobType);
    // reset();
  };

  const submitForm = handleSubmit(async (data) => {
    console.log(data);
    navigate({ to: "/profile", replace: true });
  });

  return (
    <div className="main__container">
      <div>
        <div className="title">Select Maplestory Job Type</div>
        <div className="title">Fill in the mandatory fields below</div>

        <CesForm methods={methods} useLocalStorage={true} preventLeaving={true}>
          <div className="chip__row">
            <Chip
              disabled={isSubmitting}
              checked={jobField.value === "HERO"}
              onChange={() => switchJobType("HERO")}
            >
              Hero
            </Chip>
            <Chip
              disabled={isSubmitting}
              checked={jobField.value === "ADVENTURER"}
              onChange={() => switchJobType("ADVENTURER")}
            >
              Adventurer
            </Chip>
          </div>

          <CesForm.TextInput
            disabled={isSubmitting}
            label={"Character Name"}
            control={control}
            name={"characterName"}
            additionalCallBacks={debouncedSearch}
            error={
              characterNameError && (
                <a href={"/profile"}>This name exists, do you mean this guy?</a>
              )
            }
          />

          <Textarea
            disabled={isSubmitting}
            label={"Bio for Character"}
            className="input"
            value={bioField.value}
            onChange={(e) => bioField.onChange(e.target.value)}
          />

          <Button
            disabled={!isValid}
            onClick={submitForm}
            className="create__btn"
          >
            Create Character
          </Button>
        </CesForm>
      </div>
    </div>
  );
};

export default CreateProfile;
