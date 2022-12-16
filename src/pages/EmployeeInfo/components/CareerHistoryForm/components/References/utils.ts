import {
  FieldValues,
  Path,
  UseFieldArrayReturn,
  UseFormReturn,
} from "react-hook-form";
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

// TODO: Make it generic in the future
/** Returns current selected content */
export const useCurrentContent = ({
  formMethods,
  currentField,
  currentArrayId,
}: {
  formMethods: UseFormReturn<CareerType>;
  currentField:
    | Path<CareerType>
    | Path<AppointmentType>
    | Path<CertificationType>;
  currentArrayId: number;
}) => {
  const { company, appointment, certsToField, duration, skills } =
    formMethods.getValues();
  return currentField === "company"
    ? company
    : currentField === "duration"
    ? duration
    : currentField === "position"
    ? appointment.position
    : currentField === "rank"
    ? appointment.rank
    : currentField === "name" && certsToField[currentArrayId]
    ? certsToField[currentArrayId].name
    : currentField === "issuedBy" && certsToField[currentArrayId]
    ? certsToField[currentArrayId].issuedBy
    : currentField === "skills"
    ? skills[currentArrayId]
    : "";
};

// TODO: Make it generic in the future
/** Returns the selected reference field to perform CRUD on based on given fieldName */
export const useCurrentReference = (
  fieldName: Path<CareerType> | Path<AppointmentType> | Path<CertificationType>,
) => {
  return fieldName === "rank" || fieldName === "position"
    ? "appointment.references"
    : fieldName === "issuedBy" || fieldName === "name"
    ? "certsToField"
    : "references";
};

/** Sets (Create and Update) the reference at the proper `References` field */
export const setReferences = ({
  fieldName,
  formContext,
  arrayMethod,
  existingReference,
  referenceForm,
  currentArrayId,
}: {
  fieldName: Path<CareerType> | Path<AppointmentType> | Path<CertificationType>;
  formContext: UseFormReturn<CareerType>;
  arrayMethod: UseFieldArrayReturn<CareerType>;
  existingReference?: ReferenceType;
  referenceForm: UseFormReturn<ReferenceType>;
  currentArrayId: number;
}) => {
  const isAppointmentReference =
    fieldName === "rank" || fieldName === "position";
  const isCertReference = fieldName === "issuedBy" || fieldName === "name";

  // OBJECT TYPE
  if (isAppointmentReference) {
    if (existingReference) {
      // UPDATE
      const id = formContext
        .getValues()
        .appointment.references.indexOf(existingReference);
      arrayMethod.update(id, referenceForm.getValues());
    } else {
      // CREATE
      arrayMethod.append(referenceForm.getValues());
    }
  }
  // ARRAY OBJECT TYPE
  else if (isCertReference) {
    const selectedCert = formContext.getValues().certsToField[currentArrayId];
    if (existingReference) {
      // UPDATE
      const selectedCertReferenceId =
        selectedCert.references.indexOf(existingReference);

      let existingReferences = selectedCert.references;

      existingReferences[selectedCertReferenceId] = referenceForm.getValues();

      arrayMethod.update(currentArrayId, {
        ...selectedCert,
        references: existingReferences,
      });
    } else {
      // CREATE
      arrayMethod.update(currentArrayId, {
        ...selectedCert,
        references: [...selectedCert.references, referenceForm.getValues()],
      });
    }
  }
  // STRING / STRING ARRAY TYPE
  else {
    if (existingReference) {
      // UPDATE
      const id = formContext.getValues().references.indexOf(existingReference);
      arrayMethod.update(id, referenceForm.getValues());
    } else {
      arrayMethod.append(referenceForm.getValues());
    }
  }
};
