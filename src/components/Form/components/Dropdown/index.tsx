import { Select, SelectProps } from "@mantine/core";
import React from "react";
import { FormCommonProps } from "../../typings";
import { useController } from "react-hook-form";

interface DropdownProps extends SelectProps, FormCommonProps {}

const Dropdown = (props: DropdownProps) => {
  const { control, customOnChange, ...mantineSelectProps } = props;

  const { field } = useController({
    name: String(mantineSelectProps.name),
    control,
  });

  const onChangeCallback = React.useCallback(
    (selection: any) => {
      if (customOnChange) customOnChange();
      field.onChange(selection);
    },
    [field.name],
  );

  return (
    <Select
      value={field.value}
      {...mantineSelectProps}
      onChange={(data) => onChangeCallback(data)}
    />
  );
};

export default Dropdown;
