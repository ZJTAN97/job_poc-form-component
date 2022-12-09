import React from "react";
import { Path, useFormContext } from "react-hook-form";
import { Button, Checkbox, Textarea } from "@mantine/core";
import { TriggerRow, useStyles } from "./styles";
import { IconCirclePlus } from "@tabler/icons";
import { CareerType } from "../../../../../../model/career/Career";
import { ReferenceType } from "../../../../../../model/common/Reference";
import { CertificationType } from "../../../../../../model/career/Certification";
import { AppointmentType } from "../../../../../../model/career/Appointment";

interface ReferenceTriggerProps {
  isOpenPopover: boolean;

  /** Field Name required to filter which references to show for this component instance */
  name: Path<CareerType> | Path<AppointmentType> | Path<CertificationType>;

  /** Content required to filter which references to show for this component instance */
  content: string;

  /** Currently selected field to show references on the popup component */
  currentName:
    | Path<CareerType>
    | Path<AppointmentType>
    | Path<CertificationType>;

  /** if its array of obj, id will be provided to track */
  objArrId?: number;

  /** Set selected field to show references on the popup component */
  setCurrentName: (
    arg: Path<CareerType> | Path<AppointmentType> | Path<CertificationType>,
  ) => void;

  /** Set selected item id if it is array */
  setCurrentArrayId?: (arg: number) => void;

  /** error specific to references */
  error?: string;

  setIsOpenPopover: (arg: boolean) => void;

  setEditMode: (arg: boolean) => void;

  isMassApplying: boolean;

  disabled?: boolean;
}

export const ReferenceTrigger = ({
  isOpenPopover,
  name,
  content,
  currentName,
  setCurrentName,
  setIsOpenPopover,
  setEditMode,
  disabled,
  setCurrentArrayId,
  objArrId,
  error,
  isMassApplying,
}: ReferenceTriggerProps) => {
  const { classes } = useStyles();

  const careerFormMethod = useFormContext<CareerType>();

  const field = name.split(".").length === 2 ? name.split(".")[1] : name;

  const referencePopoverTrigger = (
    name: Path<CareerType> | Path<AppointmentType> | Path<CertificationType>,
  ) => {
    setCurrentName(name);
    if (setCurrentArrayId && objArrId !== undefined)
      setCurrentArrayId(objArrId);
    setIsOpenPopover(true);
    setEditMode(false);
  };

  const existingReference = (() => {
    const allReferences = [
      ...careerFormMethod.getValues().references,
      ...careerFormMethod.getValues().appointment.references,
      ...careerFormMethod
        .getValues()
        .certsToField.map((cert) => cert.references)
        .flat(),
    ];
    const filteredReference: ReferenceType[] = allReferences.filter(
      (ref) => ref.field === field && ref.content === content,
    );
    if (filteredReference.length > 0) {
      const numOfSource = filteredReference[0].sources.length;
      const source = filteredReference[0].sources[0];
      if (numOfSource === 1) {
        return `${source.referenceType}\n${source.dateObtained.slice(0, 10)}`;
      } else if (numOfSource > 1) {
        return `${source.referenceType}\n${source.dateObtained.slice(
          0,
          10,
        )} + ${numOfSource - 1} more`;
      }
    }
    return "";
  })();

  return (
    <>
      {isOpenPopover || existingReference ? (
        <TriggerRow>
          <Textarea
            w={190}
            ml={10}
            label={"References"}
            value={existingReference}
            size="xs"
            readOnly
            onClick={() => referencePopoverTrigger(name)}
            classNames={{
              input: classes.reference,
            }}
            disabled={isOpenPopover && currentName !== name}
          />
          {isMassApplying && !disabled ? <Checkbox mt={30} ml={25} /> : null}
        </TriggerRow>
      ) : (
        <Button
          leftIcon={<IconCirclePlus />}
          variant={"white"}
          mt={24}
          onClick={() => referencePopoverTrigger(name)}
          disabled={disabled}
          color={error && "red"}
        >
          {error ? "References required" : "Add references"}
        </Button>
      )}
    </>
  );
};
