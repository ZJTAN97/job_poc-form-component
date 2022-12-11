import { Control } from "react-hook-form";
import { FieldValues } from "react-hook-form";

export interface FormCommonProps<T extends FieldValues> {
  control: Control<T>;
}
