import React from "react";
import { TextInput as MantineTextInput } from "@mantine/core";
import { useController } from "react-hook-form";
import { FormCommonProps } from "../../typings";
import { useFormContext } from "../..";

export interface TextInputProps extends FormCommonProps {
  label: string;
  error?: React.ReactNode;
  type?: React.HTMLInputTypeAttribute;
}

export const TextInput = ({
  name,
  label,
  error,
  customOnChange,
  className,
  type,
}: TextInputProps) => {
  const context = useFormContext();
  const { control, formState } = context;
  const { isSubmitting } = formState!;
  const { field, fieldState } = useController({ name, control });

  const onChangeCallback = React.useCallback(
    (searchValue: string) => {
      if (customOnChange) customOnChange(searchValue);
      field.onChange(searchValue);
    },
    [customOnChange, field]
  );

  return (
    <MantineTextInput
      disabled={isSubmitting}
      className={className}
      label={label}
      value={field.value}
      onChange={(e) => onChangeCallback(e.target.value)}
      error={error || fieldState.error?.message}
      type={type}
    />
  );
};
