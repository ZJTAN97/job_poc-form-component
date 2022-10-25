import { Control } from "react-hook-form";

export interface FormCommonProps {
    name: string;
    control: Control<any>;
    className?: string;
    customOnChange?: CallableFunction;
    disabled?: boolean;
}
