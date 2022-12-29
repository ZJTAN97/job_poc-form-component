import { TextInput } from "@mantine/core";
import { IconCirclePlus, IconX } from "@tabler/icons";
import React from "react";
import {
  useFormContext,
  useController,
  Path,
  FieldValues,
  useFieldArray,
  FieldArray,
  ArrayPath,
  PathValue,
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
  const { openPanel, currentField, currentArrayId, massApplyingFields } =
    referenceStateContext!;
  const { control, formState, getValues, setValue } = useFormContext<T>();
  const { errors } = formState;
  const { field } = useController({
    name,
    control,
  });

  const fieldArrayMethods = useFieldArray({
    name: "references" as ArrayPath<T>,
    control,
  });

  const appendStringArray = () => {
    // 1. add empty string to array
    field.onChange([...field.value, ""]);

    // 2. add empty reference to root reference array to ensure ID are in sync
    // 3. Index to be in content as a temporary marking
    const itemIndex = String(getValues()[name].length - 1);
    fieldArrayMethods.append({
      field: name,
      content: itemIndex,
      sources: [],
    } as FieldArray<T, ArrayPath<T>> | FieldArray<T, ArrayPath<T>>[]);
  };

  const popStringArray = (id: number) => {
    // 1. removing the correct references
    const refToRemove = getValues().references.find(
      (item: any) => item.content === String(id),
    );
    const indexRefToRemove = getValues().references.indexOf(refToRemove);
    fieldArrayMethods.remove(indexRefToRemove);

    // 2. need to re-index/sync in references' content
    const reIndexedContent = getValues()
      .references.filter((item: any) => item.field === String(name))
      .map((ref: any, id: number) => ({ ...ref, content: String(id) }));
    const final = [
      ...getValues().references.filter((ref: any) => ref.field !== "skills"),
      ...reIndexedContent,
    ];
    setValue("references" as Path<T>, final as PathValue<T, Path<T>>);

    // 3. remove the item from string array
    let current = [...field.value];
    current.splice(id, 1);
    field.onChange(current);
  };

  const arrayErrors = errors[name] as unknown as { [key: string]: string }[];

  return (
    <ArrayContainer>
      <ButtonRow>
        <Title disabled={openPanel}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Title>
        <IconCirclePlus
          color={openPanel ? "rgb(0 0 0 / 30%)" : "black"}
          onClick={appendStringArray}
        />
      </ButtonRow>
      {errors[name] && (
        <ErrorLabel>{errors[name]?.message?.toString()}</ErrorLabel>
      )}
      {field.value.map((val: string, id: number) => (
        <ArrayRow
          key={"string_array_" + id}
          highlight={
            (openPanel && currentArrayId === id && currentField === name) ||
            massApplyingFields.filter(
              (item) => item.field === name && item.arrayId === id,
            ).length === 1
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
                  onClick={() => popStringArray(id)}
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
