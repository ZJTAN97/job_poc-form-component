import styles from "./index.module.css";
import { Control } from "react-hook-form";
import { Form } from "../../../../../../components/Form";
import { ReferenceType } from "../../../../../../data/common/Reference";

interface SingleFieldProps {
  label: string;
  name: string;
  groupName: string;
  currentValue: string;
  parentControl: Control<any>;
  reference?: ReferenceType;
  editMode: boolean;
}

export const SingleField = ({
  label,
  name,
  groupName,
  currentValue,
  parentControl,
  reference,
  editMode,
}: SingleFieldProps) => {
  const { comments, dateObtained, referenceType } = reference ?? {};

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
