import React from "react";
import { TextInput as MantineTextInput, TextInputProps } from "@mantine/core";
import { useController } from "react-hook-form";
import { FormCommonProps } from "../../typings";

export interface FormTextInputProps extends TextInputProps, FormCommonProps {}

export const TextInput = (props: FormTextInputProps) => {
  const { control, customOnChange, ...mantineTextInputProps } = props;

  const { field, fieldState } = useController({
    name: String(mantineTextInputProps.name),
    control,
  });

  const onChangeCallback = React.useCallback(
    (searchValue: string) => {
      if (customOnChange) customOnChange(searchValue);
      field.onChange(searchValue);
    },
    [field],
  );

  return (
    <MantineTextInput
      value={field.value}
      {...mantineTextInputProps}
      error={mantineTextInputProps.error || fieldState.error?.message}
      onChange={(e) => onChangeCallback(e.target.value)}
    />
  );
};
