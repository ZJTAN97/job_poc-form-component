import React from "react";
import { Textarea as MantineTextArea, TextareaProps } from "@mantine/core";
import { useController } from "react-hook-form";
import { FormCommonProps } from "../../typings";

interface FormTextAreaProps
  extends FormCommonProps,
    Omit<TextareaProps, "onChange"> {
  onChange?: (value: string) => void;
}

export const TextArea = (props: FormTextAreaProps) => {
  const { control, onChange, ...mantineTextAreaProps } = props;

  const { field, fieldState } = useController({
    name: String(mantineTextAreaProps.name),
    control,
  });

  const overrideOnChange: React.ChangeEventHandler<HTMLTextAreaElement> =
    React.useCallback(
      (e) => {
        if (onChange) onChange(e.target.value);
        field.onChange(e.target.value);
      },
      [onChange],
    );

  return (
    <MantineTextArea
      {...mantineTextAreaProps}
      onChange={overrideOnChange}
      error={mantineTextAreaProps.error || fieldState.error?.message}
    />
  );
};
