import { Button, TextInput } from "@mantine/core";
import { IconCirclePlus, IconX } from "@tabler/icons";
import React from "react";
import {
  useFormContext,
  useController,
  Path,
  FieldValues,
  PathValue,
} from "react-hook-form";
import {
  ArrayContainer,
  ArrayRow,
  ErrorLabel,
  ObjectArrayRow,
  useStyles,
} from "./styles";

interface ObjectArrayInputProps<T extends FieldValues, K extends FieldValues> {
  /** Available naming paths for Form Object */
  name: Path<T>;

  editMode: boolean;

  /** To set empty objects when adding input fields on UI */
  emptyObject: K;

  /** Reference Trigger components to be tagged to each individual input field */
  referenceTrigger: (id: number, name: Path<T> | Path<K>) => React.ReactNode;
}

export const ObjectArrayInput = <T extends FieldValues, K extends FieldValues>({
  name,
  editMode,
  emptyObject,
  referenceTrigger,
}: ObjectArrayInputProps<T, K>) => {
  const { classes } = useStyles();

  const { control, formState } = useFormContext<T>();
  const { errors } = formState;

  const { field } = useController({
    name,
    control,
  });

  const arrayErrors = errors[name] as unknown as {
    [key: string]: { [key: string]: string };
  }[];

  console.log("-- focus here --");
  console.log(arrayErrors);

  return (
    <ArrayContainer>
      <ArrayRow>
        <Button
          p={0}
          mb={10}
          rightIcon={<IconCirclePlus />}
          variant="subtle"
          size="lg"
          onClick={() => field.onChange([...field.value, emptyObject])}
          color={"black"}
          disabled={!editMode}
        >
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Button>
      </ArrayRow>
      {errors[name] && (
        <ErrorLabel>{errors[name]?.message?.toString()}</ErrorLabel>
      )}
      {field.value.map((item: PathValue<T, Path<T>>, id: number) => (
        <ObjectArrayRow key={"object_array_" + id}>
          <Button
            disabled={!editMode}
            onClick={() => {
              let current = [...field.value];
              current.splice(id, 1);
              field.onChange(current);
            }}
            variant="outline"
            color={"blue"}
            size={"xs"}
            mb={10}
            rightIcon={<IconX size={12} />}
            styles={{
              root: {
                ":hover": {
                  color: "red",
                  borderColor: "red",
                },
              },
            }}
          >
            {`Certification ${id + 1}`}
          </Button>
          <ArrayRow>
            <TextInput
              label={"Certificate Name"}
              className={classes.skillTextInput}
              disabled={!editMode}
              onChange={(e) => {
                let current = [...field.value];
                current[id] = { ...item, name: e.target.value };
                field.onChange(current);
              }}
              error={
                arrayErrors &&
                arrayErrors.length > 0 &&
                arrayErrors[id] &&
                arrayErrors[id].name?.message
              }
            />
            {referenceTrigger(id, "name" as Path<K>)}
          </ArrayRow>
          <ArrayRow>
            <TextInput
              label={"Issued by"}
              className={classes.skillTextInput}
              disabled={!editMode}
              onChange={(e) => {
                let current = [...field.value];
                current[id] = { ...item, issuedBy: e.target.value };
                field.onChange(current);
              }}
              error={
                arrayErrors &&
                arrayErrors.length > 0 &&
                arrayErrors[id] &&
                arrayErrors[id].issuedBy?.message
              }
            />
            {referenceTrigger(id, "issuedBy" as Path<K>)}
          </ArrayRow>
        </ObjectArrayRow>
      ))}
    </ArrayContainer>
  );
};
