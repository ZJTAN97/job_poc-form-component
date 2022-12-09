import React from "react";
import {
  MultiSelect as MantineMultiSelect,
  MultiSelectProps,
} from "@mantine/core";
import { FormCommonProps } from "../../typings";
import { useController } from "react-hook-form";

export interface FormMultiSelectProps
  extends Omit<MultiSelectProps, "onChange">,
    FormCommonProps {
  onChange?: (value: string[]) => void;
}

const MultiSelect = (props: FormMultiSelectProps) => {
  const { control, onChange, ...mantineMultiInputProps } = props;

  const { field, fieldState } = useController({
    name: String(mantineMultiInputProps.name),
    control,
  });

  const overrideOnChange = React.useCallback(
    (values: string[]) => {
      if (onChange) onChange(values);
      field.onChange(values);
    },
    [onChange],
  );

  return (
    <MantineMultiSelect
      {...mantineMultiInputProps}
      error={mantineMultiInputProps.error || fieldState.error?.message}
      onChange={overrideOnChange}
    />
  );
};

export default MultiSelect;
