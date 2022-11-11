import React from "react";
import {
  MultiSelect as MantineMultiSelect,
  MultiSelectProps,
} from "@mantine/core";
import { FormCommonProps } from "../../typings";
import { useController } from "react-hook-form";

export interface FormMultiSelectProps
  extends MultiSelectProps,
    FormCommonProps {}

const MultiSelect = (props: FormMultiSelectProps) => {
  const { control, customOnChange, ...mantineMultiInputProps } = props;

  const { field, fieldState } = useController({
    name: String(mantineMultiInputProps.name),
    control,
  });

  const onChangeCallback = React.useCallback(
    (searchValue: string[]) => {
      if (customOnChange) customOnChange(searchValue);
      field.onChange(searchValue);
    },
    [field.name],
  );

  return (
    <MantineMultiSelect
      {...mantineMultiInputProps}
      error={mantineMultiInputProps.error || fieldState.error?.message}
      onChange={(arr) => onChangeCallback(arr)}
    />
  );
};

export default MultiSelect;
