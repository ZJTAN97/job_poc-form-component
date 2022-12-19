import { TextInput } from "@mantine/core";
import { IconCirclePlus, IconX } from "@tabler/icons";
import React from "react";
import {
  useFormContext,
  useController,
  Path,
  FieldValues,
} from "react-hook-form";
import { useReferenceStateContext } from "../References";
import {
  ArrayContainer,
  ArrayRow,
  ButtonRow,
  ErrorLabel,
  Title,
  useStyles,
} from "./styles";

interface StringArrayInputProps<T extends FieldValues> {
  name: Path<T>;
  referenceTrigger: (index: number) => React.ReactNode;
}

export const StringArrayInput = <T extends FieldValues>({
  name,
  referenceTrigger,
}: StringArrayInputProps<T>) => {
  const { classes } = useStyles();
  const referenceStateContext = useReferenceStateContext();
  const { openPanel, currentField, currentArrayId } = referenceStateContext!;
  const { control, formState } = useFormContext<T>();
  const { errors } = formState;
  const { field } = useController({
    name,
    control,
  });

  const arrayErrors = errors[name] as unknown as { [key: string]: string }[];

  return (
    <ArrayContainer>
      <ButtonRow>
        <Title disabled={openPanel}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Title>
        <IconCirclePlus
          color={openPanel ? "rgb(0 0 0 / 30%)" : "black"}
          onClick={() => field.onChange([...field.value, ""])}
        />
      </ButtonRow>
      {errors[name] && (
        <ErrorLabel>{errors[name]?.message?.toString()}</ErrorLabel>
      )}
      {field.value.map((val: string, id: number) => (
        <ArrayRow
          key={"string_array_" + id}
          highlight={
            openPanel && currentArrayId === id && currentField === name
          }
        >
          <TextInput
            label={`${name.charAt(0).toUpperCase() + name.slice(1)} #${id + 1}`}
            value={val}
            className={classes.skillTextInput}
            onChange={(e) => {
              let current = [...field.value];
              current[id] = e.target.value;
              field.onChange(current);
            }}
            disabled={openPanel}
            variant={!openPanel ? "default" : "unstyled"}
            rightSection={
              !openPanel && (
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
