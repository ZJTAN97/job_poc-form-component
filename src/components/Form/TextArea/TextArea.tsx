import React from "react";
import { Textarea as MantineTextArea, TextareaProps } from "@mantine/core";
import { FieldValues, Path, useController } from "react-hook-form";
import { FormCommonProps } from "../typings";

interface FormTextAreaProps<T extends FieldValues>
  extends FormCommonProps<T>,
    Omit<TextareaProps, "onChange" | "name"> {
  name: Path<T>;
  onChange?: (value: string) => void;
}

export const TextArea = <T extends FieldValues>(
  props: FormTextAreaProps<T>,
) => {
  const { control, name, onChange, ...mantineTextAreaProps } = props;

  const { field, fieldState } = useController({
    name,
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
