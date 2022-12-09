import React from "react";
import { TextInput as MantineTextInput, TextInputProps } from "@mantine/core";
import { useController } from "react-hook-form";
import { FormCommonProps } from "../../typings";

export interface FormTextInputProps
  extends Omit<TextInputProps, "onChange">,
    FormCommonProps {
  onChange?: (value: string) => void;
}

export const TextInput = (props: FormTextInputProps) => {
  const { control, onChange, ...mantineTextInputProps } = props;

  const { field, fieldState } = useController({
    name: String(mantineTextInputProps.name),
    control,
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
