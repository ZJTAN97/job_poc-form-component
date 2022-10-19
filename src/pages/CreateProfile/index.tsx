import React from "react";
import {
  useForm,
  useController,
  FormProvider,
  SubmitHandler,
} from "react-hook-form";
import { FormSchemaType, formSchema } from "../../validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Chip, TextInput } from "@mantine/core";
import mockSearchCharacterNames from "../../mock";
import { debounce } from "lodash";

const CreateProfile: React.FC = () => {
  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      job: "HERO",
      characterName: "",
    },
  });

  const { watch, formState, handleSubmit, control } = methods;
  const { isDirty, isValid, isSubmitting } = formState;

  const { field: jobField } = useController({ name: "job", control: control });
  const { field: characterNameField } = useController({
    name: "characterName",
    control: control,
  });

  const [characterNameError, setCharacterNameError] = React.useState("");

  const debouncedSearch = debounce(async (criteria: string) => {
    await mockSearchCharacterNames(criteria, setCharacterNameError);
  }, 750);

  const searchExistingNames = React.useCallback((searchValue: string) => {
    characterNameField.onChange(searchValue);
    debouncedSearch(searchValue);
  }, []);

  const submitForm = handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <div>
      <div>Select Maplestory Job Type</div>
      <div>Fill in the mandatory fields below</div>

      <FormProvider {...methods}>
        <Chip
          checked={jobField.value === "HERO"}
          onChange={() => jobField.onChange("HERO")}
        >
          Hero
        </Chip>
        <Chip
          checked={jobField.value === "ADVENTURER"}
          onChange={() => jobField.onChange("ADVENTURER")}
        >
          Adventurer
        </Chip>
        <TextInput
          value={characterNameField.value}
          onChange={(e) => searchExistingNames(e.target.value)}
          error={
            characterNameError && <a href={characterNameField.value}>Link</a>
          }
        />
        <Button
          disabled={characterNameError ? true : false}
          onClick={submitForm}
        >
          Create Character
        </Button>
      </FormProvider>
    </div>
  );
};

export default CreateProfile;
