import { Button, TextInput } from "@mantine/core";
import { IconCirclePlus, IconX } from "@tabler/icons";
import {
  useFormContext,
  useController,
  Path,
  FieldValues,
} from "react-hook-form";
import { ArrayContainer, ArrayRow, ErrorLabel, useStyles } from "./styles";

interface StringArrayInputProps<T extends FieldValues> {
  name: Path<T>;
  editMode: boolean;
  referenceTrigger: (index: number) => React.ReactNode;
}

export const StringArrayInput = <T extends FieldValues>({
  name,
  editMode,
  referenceTrigger,
}: StringArrayInputProps<T>) => {
  const { classes } = useStyles();
  const { control, formState } = useFormContext<T>();
  const { errors } = formState;
  const { field } = useController({
    name,
    control,
  });

  const arrayErrors = errors[name] as unknown as { [key: string]: string }[];

  return (
    <ArrayContainer>
      <ArrayRow>
        <Button
          p={0}
          mb={10}
          rightIcon={<IconCirclePlus />}
          variant="subtle"
          size="lg"
          onClick={() => field.onChange([...field.value, ""])}
          color={"black"}
          disabled={!editMode}
        >
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Button>
      </ArrayRow>
      {errors[name] && (
        <ErrorLabel>{errors[name]?.message?.toString()}</ErrorLabel>
      )}
      {field.value.map((val: string, id: number) => (
        <ArrayRow key={"string-array" + id}>
          <TextInput
            label={`${name.charAt(0).toUpperCase() + name.slice(1)} #${id + 1}`}
            value={val}
            className={classes.skillTextInput}
            onChange={(e) => {
              let current = [...field.value];
              current[id] = e.target.value;
              field.onChange(current);
            }}
            rightSection={
              editMode && (
                <IconX
                  key={"string-array-icon" + id}
                  size={20}
                  onClick={() => {
                    let current = [...field.value];
                    current.splice(id, 1);
                    field.onChange(current);
                  }}
                />
              )
            }
            error={
              arrayErrors &&
              arrayErrors.length > 0 &&
              arrayErrors[id] &&
              arrayErrors[id].message
            }
          />
          {referenceTrigger(id)}
        </ArrayRow>
      ))}
    </ArrayContainer>
  );
};
