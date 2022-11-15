import styles from "./index.module.css";
import { Control } from "react-hook-form";
import { ReferenceType } from "../../../../../../data/common/Reference";
import { Form } from "../../../../../../components/Form";

interface SingleObjectProps<
  T extends {
    [key: string]: string;
  },
> {
  parentControl: Control<any>;
  labels: string[];
  names: (keyof T)[];
  groupName: string;
  editMode: boolean;
  existingReferences: ReferenceType[];
  currentValues: T;
}

export const SingleObject = <
  T extends {
    [key: string]: string;
  },
>({
  parentControl,
  labels,
  names,
  groupName,
  editMode,
  existingReferences,
  currentValues,
}: SingleObjectProps<T>) => {
  return (
    <div className={styles.main__container}>
      <div className={styles.container__col}>{groupName}</div>
      <div className={styles.container__col}>
        {names.map((name, id) => {
          const { comments, dateObtained, referenceType } =
            existingReferences.find(
              (item) => item.field === "appointment." + (name as string),
            ) ?? {};

          return (
            <div key={name.toString() + id}>
              {editMode ? (
                <Form.TextInput
                  value={currentValues[name]}
                  name={"appointment." + (name as string)}
                  label={labels[id]}
                  control={parentControl}
                />
              ) : (
                <>
                  <div className={styles.read__label}>{labels[id]}</div>
                  <div className={styles.read__value}>
                    {currentValues[name]}
                  </div>
                </>
              )}
              <div className={styles.applied__reference}>
                {comments && dateObtained && referenceType && (
                  <div>
                    {referenceType} | {comments} | {dateObtained}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
