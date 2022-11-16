import React from "react";
import { UseFormReturn } from "react-hook-form";
import { CareerType } from "../../../../../../data/career/CareerHistory";

interface AddReferencesProps {
  formMethods: UseFormReturn<CareerType>;
}

export const AddReferences = ({ formMethods }: AddReferencesProps) => {
  const { control, getValues, setValue, watch } = formMethods;

  return <div></div>;
};
