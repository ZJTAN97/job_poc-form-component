import React from "react";
import styles from "./index.module.css";
import { Control } from "react-hook-form";
import { SchemaReferenceType } from "../../../../validations/career";
import Form from "../../../../components/Form";

interface SingleFieldProps {
  label: string;
  name: string;
  parentControl: Control<any>;
  reference?: SchemaReferenceType;
}

export const SingleField = ({
  label,
  name,
  parentControl,
  reference,
}: SingleFieldProps) => {
  const { comments, dateObtained, referenceType } = reference ?? {};

  return (
    <div className={styles.text__input}>
      <Form.TextInput label={label} name={name} control={parentControl} />
      <div className={styles.applied__reference}>
        {reference ? (
          <div>
            {referenceType} | {comments} | {dateObtained}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
