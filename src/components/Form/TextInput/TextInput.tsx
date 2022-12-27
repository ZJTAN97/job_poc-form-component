import React from "react";
import { TextInput as MantineTextInput, TextInputProps } from "@mantine/core";
import { useController, Path, FieldValues } from "react-hook-form";

export interface FormTextInputProps<T extends FieldValues>
  extends Omit<TextInputProps, "onChange" | "name"> {
  name: Path<T>;
  onChange?: (value: string) => void;
}

export const TextInput = <T extends FieldValues>(
  props: FormTextInputProps<T>,
) => {
  const { name, onChange, ...mantineTextInputProps } = props;
  const { field, fieldState } = useController({
    name,
  });

  const overrideOnChange: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback(
      (e) => {
        if (onChange) onChange(e.target.value);
        field.onChange(e.target.value);
      },
      [onChange],
    );

  return (
    <MantineTextInput
      value={field.value}
      {...mantineTextInputProps}
      error={mantineTextInputProps.error || fieldState.error?.message}
      onChange={overrideOnChange}
    />
  );
};
