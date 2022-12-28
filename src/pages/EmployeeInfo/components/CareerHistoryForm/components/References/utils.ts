import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  FieldValues,
  Path,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { AppointmentType } from "../../../../../../model/career/Appointment";
import { CareerType } from "../../../../../../model/career/Career";
import { CertificationType } from "../../../../../../model/career/Certification";
import {
  Reference,
  ReferenceType,
} from "../../../../../../model/common/Reference";
import { Source, SourceType } from "../../../../../../model/common/Source";

export const useExistingReference = <T extends FieldValues>({
  references,
  field,
  arrayId,
}: {
  references: ReferenceType[];
  field: Path<T>;
  arrayId?: number;
}) => {
  let filteredReference: ReferenceType[] = [];
  let stringText = "";

  if (arrayId !== undefined) {
    const filteredByArray = references.filter((ref) => ref.field === field);
    filteredReference = filteredByArray.filter((_, id) => id === arrayId);
  } else {
    filteredReference = references.filter((ref) => ref.field === field);
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

export const useCurrentReference = (
  fieldName: Path<CareerType> | Path<AppointmentType> | Path<CertificationType>,
) => {
  return fieldName === "rank" || fieldName === "position"
    ? "appointment.references"
    : fieldName === "issuedBy" || fieldName === "name"
    ? "certsToField"
    : "references";
};

export const useSetSources = ({
  fieldName,
  currentArrayId,
  setLastSource,
}: {
  fieldName: Path<CareerType> | Path<AppointmentType> | Path<CertificationType>;
  currentArrayId?: number;
  setLastSource: (arg: SourceType) => void;
}) => {
  const formContext = useFormContext<CareerType>();

  const existingReference = useExistingReference({
    references: [
      ...formContext.getValues().references,
      ...formContext.getValues().appointment.references,
      ...formContext
        .getValues()
        .certsToField.map((cert) => cert.references)
        .flat(),
    ],
    field: fieldName!,
    arrayId: currentArrayId,
  }).filteredReference;

  const referenceFormMethod = useForm<ReferenceType>({
    resolver: zodResolver(Reference),
    mode: "onChange",
    defaultValues: {
      field: fieldName,
      content: "",
      sources: existingReference?.sources ?? [],
    },
  });

  const sourceFormMethod = useForm<SourceType>({
    resolver: zodResolver(Source),
    mode: "onChange",
    defaultValues: {
      comment: "",
      dateObtained: "2022-11-11T12:19:54.52",
      referenceType: undefined,
    },
  });

  const referenceArrayMethods = useFieldArray<CareerType>({
    control: formContext.control,
    name: useCurrentReference(fieldName),
  });

  const sourceArrayMethods = useFieldArray<ReferenceType>({
    control: referenceFormMethod.control,
    name: "sources",
  });

  const existingSources = existingReference?.sources ?? [];

  const [sourceId, setSourceId] = React.useState<number>();
  const [popupMode, setPopupMode] = React.useState<"edit" | "read">(
    existingSources.length > 0 ? "read" : "edit",
  );

  const updateReferences = () => {
    const isAppointmentReference =
      fieldName === "rank" || fieldName === "position";
    const isCertReference = fieldName === "issuedBy" || fieldName === "name";
    const isSkillReference = fieldName === "skills" && existingReference;

    if (isAppointmentReference) {
      if (existingReference) {
        const existingReferenceId = formContext
          .getValues()
          .appointment.references.indexOf(existingReference);
        referenceArrayMethods.update(
          existingReferenceId,
          referenceFormMethod.getValues(),
        );
      } else {
        referenceArrayMethods.append(referenceFormMethod.getValues());
      }
    } else if (isCertReference) {
      const selectedCert =
        formContext.getValues().certsToField[currentArrayId!];
      if (existingReference) {
        const selectedCertReferenceId =
          selectedCert.references.indexOf(existingReference);
        let currentReferences = selectedCert.references;
        currentReferences[selectedCertReferenceId] =
          referenceFormMethod.getValues();
        referenceArrayMethods.update(currentArrayId!, {
          ...selectedCert,
          references: currentReferences,
        });
      } else {
        referenceArrayMethods.update(currentArrayId!, {
          ...selectedCert,
          references: [
            ...selectedCert.references,
            referenceFormMethod.getValues(),
          ],
        });
      }
    } else if (isSkillReference) {
      const existingReferenceId = formContext
        .getValues()
        .references.indexOf(existingReference);
      referenceArrayMethods.update(existingReferenceId, {
        ...existingReference,
        sources: referenceFormMethod.getValues().sources,
      });
    } else {
      if (existingReference) {
        const existingReferenceId = formContext
          .getValues()
          .references.indexOf(existingReference);
        referenceArrayMethods.update(
          existingReferenceId,
          referenceFormMethod.getValues(),
        );
      } else {
        referenceArrayMethods.append(referenceFormMethod.getValues());
      }
    }
  };

  const applySourcesToReferences = () => {
    if (sourceId !== undefined) {
      sourceArrayMethods.update(sourceId, sourceFormMethod.getValues());
      setSourceId(undefined);
    } else {
      sourceArrayMethods.append(sourceFormMethod.getValues());
    }
    updateReferences();
    setLastSource(sourceFormMethod.getValues());
    sourceFormMethod.reset();
    setPopupMode("read");
    setSourceId(undefined);
  };

  const editSource = (sourceId: number) => {
    sourceFormMethod.setValue(
      "referenceType",
      referenceFormMethod.getValues().sources[sourceId].referenceType,
    );
    sourceFormMethod.setValue(
      "dateObtained",
      referenceFormMethod.getValues().sources[sourceId].dateObtained,
    );
    sourceFormMethod.setValue(
      "comment",
      referenceFormMethod.getValues().sources[sourceId].comment,
    );
    setPopupMode("edit");
    setSourceId(sourceId);
  };

  const deleteSource = (sourceId: number) => {
    sourceArrayMethods.remove(sourceId);
    updateReferences();
    if (referenceFormMethod.getValues().sources.length === 0) {
      setPopupMode("edit");
    }
  };

  return {
    existingSources,
    sourceFormMethod,
    referenceFormMethod,
    applySourcesToReferences,
    editSource,
    deleteSource,
    setPopupMode,
    popupMode,
  };
};
