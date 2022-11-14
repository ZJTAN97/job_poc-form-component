import React from "react";
import styles from "./index.module.css";
import { Control, UseFormSetValue } from "react-hook-form";
import { Form } from "../../../../components/Form";
import {
  Reference,
  ReferenceType,
  TYPES_OF_REFERENCES,
} from "../../../../data/common/Reference";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CareerType } from "../../../../data/career/CareerHistory";

interface SingleFieldProps {
  label: string;
  name: string;
  groupName: string;
  currentValue: string;
  parentControl: Control<any>;
  reference?: ReferenceType;
  editMode: boolean;
  selected?: boolean;
  apply: boolean;
  setParentReferences: UseFormSetValue<CareerType>;
}

export const SingleField = ({
  label,
  name,
  groupName,
  currentValue,
  parentControl,
  reference,
  editMode,
  selected,
  apply,
  setParentReferences,
}: SingleFieldProps) => {
  const { comments, dateObtained, referenceType } = reference ?? {};

  const referenceFormMethods = useForm<ReferenceType>({
    resolver: zodResolver(Reference),
    mode: "onChange",
    defaultValues: {
      field: "",
      content: "",
      comments: "",
      dateObtained: "",
      referenceType: TYPES_OF_REFERENCES.FACEBOOK,
    },
  });

  const {
    control: referenceFormControl,
    handleSubmit: referenceFormHandleSubmit,
  } = referenceFormMethods;

  if (selected && apply) {
    console.log("update form");
    setParentReferences("references", []);
  }

  return (
    <div className={styles.main__container}>
      <div className={styles.container__col}>{groupName}</div>
      <div className={styles.container__col}>
        {editMode ? (
          <Form.TextInput
            value={currentValue}
            label={label}
            name={name}
            control={parentControl}
          />
        ) : (
          <>
            <div className={styles.read__label}>{label}</div>
            <div className={styles.read__value}>{currentValue}</div>
          </>
        )}
        <div className={styles.applied__reference}>
          {reference && (
            <div>
              {referenceType} | {comments} | {dateObtained}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
