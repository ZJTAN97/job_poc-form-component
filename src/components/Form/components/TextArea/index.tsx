import React from "react";
import { Textarea as MantineTextArea } from "@mantine/core";
import { useController } from "react-hook-form";
import { FormCommonProps } from "../../typings";
import { useFormContext } from "../..";

interface TextInputProps extends FormCommonProps {
  label: string;
  error?: React.ReactNode;
}

export const TextArea = ({
  name,
  label,
  error,
  customOnChange,
  className,
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
    <MantineTextArea
      disabled={isSubmitting}
      className={className}
      label={label}
      value={field.value}
      onChange={(e) => onChangeCallback(e.target.value)}
      error={error || fieldState.error?.message}
    />
  );
};
