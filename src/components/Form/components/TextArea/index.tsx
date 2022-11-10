import React from "react";
import { Textarea as MantineTextArea, TextareaProps } from "@mantine/core";
import { useController } from "react-hook-form";
import { FormCommonProps } from "../../typings";

interface FormTextAreaProps extends FormCommonProps, TextareaProps {}

export const TextArea = (props: FormTextAreaProps) => {
  const { control, customOnChange, ...mantineTextAreaProps } = props;

  const { field, fieldState } = useController({
    name: String(mantineTextAreaProps.name),
    control,
  });

  const onChangeCallback = React.useCallback(
    (searchValue: string) => {
      if (customOnChange) customOnChange(searchValue);
      field.onChange(searchValue);
    },
    [field.name],
  );

  return (
    <MantineTextArea
      {...mantineTextAreaProps}
      onChange={(e) => onChangeCallback(e.target.value)}
      error={mantineTextAreaProps.error || fieldState.error?.message}
    />
  );
};
