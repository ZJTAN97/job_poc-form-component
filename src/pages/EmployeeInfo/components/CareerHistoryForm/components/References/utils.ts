import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { ReferenceType } from "../../../../../../model/common/Reference";

export const useExistingReference = <T extends FieldValues>({
  references,
  field,
  content,
}: {
  references: ReferenceType[];
  field: Path<T>;
  content: string;
}) => {
  const filteredReference = references.filter(
    (ref) => ref.field === field && ref.content === content,
  );

  let stringText;

  if (filteredReference.length === 1) {
    const numOfSource = filteredReference[0].sources.length;
    const firstSource = filteredReference[0].sources[0];

    if (numOfSource === 1) {
      stringText = `${
        firstSource.referenceType
      }\n${firstSource.dateObtained.slice(0, 10)}`;
    } else if (numOfSource > 1) {
      stringText = `${
        firstSource.referenceType
      }\n${firstSource.dateObtained.slice(0, 10)} + ${numOfSource - 1} more`;
    }
  }

  return {
    stringText: stringText,
    filteredReference: filteredReference[0],
  };
};

/** returns current selected content */
export const useCurrentContent = <T extends FieldValues>({
  formMethods,
  currentField,
}: {
  formMethods: UseFormReturn<T>;
  currentField: Path<T>;
}) => {
  // need to handle array type as well later
  return formMethods.getValues()[currentField] as string; 
};

/** returns the selected reference field to perform CRUD on */
export const useCurrentReference = () => {};
