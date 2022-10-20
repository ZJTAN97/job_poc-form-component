import React from "react";
import "./index.css";
import { useForm, useController, FormProvider } from "react-hook-form";
import { FormSchemaType, formSchema } from "../../validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Chip, Textarea, TextInput } from "@mantine/core";
import mockSearchCharacterNames from "../../mock";
import { debounce } from "lodash";

const CreateProfile: React.FC = () => {
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

  const { formState, handleSubmit, control } = methods;
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

  const searchExistingNames = React.useCallback(
    (searchValue: string) => {
      characterNameField.onChange(searchValue);
      debouncedSearch(searchValue);
    },
    [characterNameField.name]
  );

  const switchJobType = (jobType: FormSchemaType["job"]) => {
    jobField.onChange(jobType);
    characterNameField.onChange("");
    bioField.onChange("");
  };

  const submitForm = handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <div className="main__container">
      <div>
        <div className="title">Select Maplestory Job Type</div>
        <div className="title">Fill in the mandatory fields below</div>

        <FormProvider {...methods}>
          <div className="chip__row">
            <Chip
              checked={jobField.value === "HERO"}
              onChange={() => switchJobType("HERO")}
            >
              Hero
            </Chip>
            <Chip
              checked={jobField.value === "ADVENTURER"}
              onChange={() => switchJobType("ADVENTURER")}
            >
              Adventurer
            </Chip>
          </div>

          <TextInput
            className="input"
            label={"Character Name"}
            value={characterNameField.value}
            onChange={(e) => searchExistingNames(e.target.value)}
            error={
              characterNameError && (
                <a href={characterNameField.value}>
                  This profile exists, do you mean this guy?
                </a>
              )
            }
          />

          <Textarea
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
        </FormProvider>
      </div>
    </div>
  );
};

export default CreateProfile;
