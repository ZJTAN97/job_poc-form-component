import React from "react";
import { Textarea as MantineTextArea, TextareaProps } from "@mantine/core";
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";

interface FormTextAreaProps<T extends FieldValues>
  extends Omit<TextareaProps, "onChange" | "name"> {
  name: Path<T>;
  onChange?: (value: string) => void;
}

export const TextArea = <T extends FieldValues>(
  props: FormTextAreaProps<T>,
) => {
  const { name, onChange, ...mantineTextAreaProps } = props;

  const { control } = useFormContext<T>();

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
