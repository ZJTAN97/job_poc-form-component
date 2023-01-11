import { FieldValues, Path } from "react-hook-form";
import { ReferenceType } from "../../../../../../model/common/Reference";

export const getExistingReference = <T extends FieldValues>({
  formMethodValue,
  field,
  arrayId,
}: {
  formMethodValue: T;
  field: Path<T>;
  arrayId?: number;
}) => {
  const collatedReferences: ReferenceType[] = [];

  // 1. Handles Root References
  collatedReferences.push(...formMethodValue.references);
  const { references, ...remainingFields } = formMethodValue;

  for (let value of Object.values(remainingFields)) {
    if (typeof value === "object") {
      if (!Array.isArray(value) && value !== null) {
        // 2. Handles Single Object References
        collatedReferences.push(...value.references);
      } else if (
        Array.isArray(value) &&
        typeof value[0] === "object" &&
        value !== null
      ) {
        // 3. Handles Array Object References
        value.map((obj) => collatedReferences.push(...obj.references));
      }
    }
  }

  let filteredReference: ReferenceType[] = [];
  let stringText = "";

  if (arrayId !== undefined) {
    const filteredByArray = collatedReferences.filter(
      (ref) => ref.field === field,
    );
    filteredReference = filteredByArray.filter((_, id) => id === arrayId);
  } else {
    filteredReference = collatedReferences.filter((ref) => ref.field === field);
  }

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
