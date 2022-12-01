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
  rightSection: (index: number) => React.ReactNode;
}

export const StringArrayInput = <T extends FieldValues>({
  name,
  editMode,
  rightSection,
}: StringArrayInputProps<T>) => {
  const { classes } = useStyles();
  const { control, formState } = useFormContext<T>();
  const { errors } = formState;
  const { field } = useController({
    name,
    control,
  });

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
          Skills
        </Button>
      </ArrayRow>
      {errors[name] && <ErrorLabel>Requires at least one skill set</ErrorLabel>}
      {field.value.map((val: string, id: number) => (
        <ArrayRow key={"string-array" + id}>
          <TextInput
            label={`Skill #${id + 1}`}
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
          />
          {rightSection(id)}
        </ArrayRow>
      ))}
    </ArrayContainer>
  );
};
