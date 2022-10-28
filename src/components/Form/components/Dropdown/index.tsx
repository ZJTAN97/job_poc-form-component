import { Select, SelectItem } from "@mantine/core";
import React from "react";
import { FormCommonProps } from "../../typings";
import { useController } from "react-hook-form";

interface DropdownProps extends FormCommonProps {
  choices: any[];
  label?: string;
}

const Dropdown = ({
  control,
  name,
  customOnChange,
  className,
  disabled,
  choices,
  label,
}: DropdownProps) => {
  const { field } = useController({ name, control });

  const onChangeCallback = React.useCallback(
    (selection: any) => {
      if (customOnChange) customOnChange();
      field.onChange(selection);
    },
    [field.name]
  );

  return (
    <Select
      label={label}
      data={choices}
      onChange={(data) => onChangeCallback(data)}
    />
  );
};

export default Dropdown;
