import React from "react";
import { useStyles } from "../../../../../styles";
import useReferencesTool from "../hook";
import { useFormContext, FieldValues, Path } from "react-hook-form";

interface TriggerProps<T extends FieldValues> {
  fieldName: Path<T>;
}

export const Trigger = <T extends FieldValues>({
  fieldName,
}: TriggerProps<T>) => {
  const { classes } = useStyles();

  const careerFormMethod = useFormContext<T>();

  const {
    editMode,
    setEditMode,
    currentName,
    setCurrentName,
    openPanel,
    setOpenPanel,
  } = useReferencesTool();

  return (
    <button
      onClick={() => {
        setOpenPanel(!openPanel);
      }}
    >
      Panel
    </button>
  );
};
