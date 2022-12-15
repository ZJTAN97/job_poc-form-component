import React from "react";
import { useReferenceStateContext } from "../References";
import { TriggerRow, useStyles } from "./styles";
import { useFormContext, Path } from "react-hook-form";
import { CareerType } from "../../../../../../../model/career/Career";
import { AppointmentType } from "../../../../../../../model/career/Appointment";
import { CertificationType } from "../../../../../../../model/career/Certification";
import { Button, Textarea } from "@mantine/core";
import { TextArea } from "../../../../../../../components/Form/TextArea/TextArea";

interface ReferencesTriggerProp {
  /** Field Name required to filter which references to show for this component instance */
  field: Path<CareerType> | Path<AppointmentType> | Path<CertificationType>;

  /** Content required to filter which references to show for this component instance */
  content: string;
}

export const ReferencesTrigger = ({
  field,
  content,
}: ReferencesTriggerProp) => {
  const { classes } = useStyles();

  const referenceStateContext = useReferenceStateContext();
  const formContext = useFormContext<CareerType>();

  const {
    openPanel,
    setOpenPanel,
    currentArrayId,
    setCurrentArrayId,
    editMode,
    setEditMode,
    currentName,
    setCurrentName,
  } = referenceStateContext!;

  const referencePanelTrigger = (
    name: Path<CareerType> | Path<AppointmentType> | Path<CertificationType>,
  ) => {
    setCurrentName(name);
  };

  const existingReference = (() => {
    const allReferences = [
      ...formContext.getValues().references,
      ...formContext.getValues().appointment.references,
      ...formContext
        .getValues()
        .certsToField.map((cert) => cert.references)
        .flat(),
    ];

    const filteredReference = allReferences.filter(
      (ref) => ref.field === field && ref.content === content,
    );

    if (filteredReference.length === 1) {
      const numOfSource = filteredReference[0].sources.length;
      const firstSource = filteredReference[0].sources[0];

      if (numOfSource === 1) {
        `${firstSource.referenceType}\n${firstSource.dateObtained.slice(
          0,
          10,
        )}`;
      } else if (numOfSource > 1) {
        return `${firstSource.referenceType}\n${firstSource.dateObtained.slice(
          0,
          10,
        )} + ${numOfSource - 1} more`;
      }
    }
    return "";
  })();

  return (
    <>
      {openPanel || existingReference ? (
        <TriggerRow>
          <Textarea
            w={190}
            ml={10}
            label={"References"}
            value={existingReference}
            size="xs"
            readOnly
            // onClick={() => referencePopoverTrigger(name)}
            classNames={{
              input: classes.reference,
            }}
            disabled={openPanel && currentName !== field}
          />
        </TriggerRow>
      ) : (
        <Button>{}</Button>
      )}
    </>
  );
};
