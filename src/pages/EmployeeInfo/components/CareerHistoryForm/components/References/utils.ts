import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { AppointmentType } from "../../../../../../model/career/Appointment";
import { CareerType } from "../../../../../../model/career/Career";
import { CertificationType } from "../../../../../../model/career/Certification";
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

// TODO: Make it generic in the future
/** returns the selected reference field to perform CRUD on based on given fieldName */
export const useCurrentReference = (
  fieldName: Path<CareerType> | Path<AppointmentType> | Path<CertificationType>,
) => {
  return fieldName === "rank" || fieldName === "position"
    ? "appointment.references"
    : fieldName === "issuedBy" || fieldName === "name"
    ? "certsToField"
    : "references";
};
