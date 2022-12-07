import React from "react";
import { Path, useFormContext } from "react-hook-form";
import { Button, Textarea } from "@mantine/core";
import { useStyles } from "./styles";
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

  /** Currently selected content to show references on the popup component */
  currentContent: string;

  /** Set selected content to show references on the popup component */
  setCurrentContent: (arg: string) => void;

  /** Set selected obj id if its array of objects */
  setCurrentArrayObjId?: (arg: number) => void;

  setIsOpenPopover: (arg: boolean) => void;

  setEditMode: (arg: boolean) => void;

  disabled?: boolean;
}

export const ReferenceTrigger = ({
  isOpenPopover,
  name,
  content,
  currentName,
  setCurrentName,
  currentContent,
  setCurrentContent,
  setIsOpenPopover,
  setEditMode,
  disabled,
  setCurrentArrayObjId,
  objArrId,
}: ReferenceTriggerProps) => {
  const { classes } = useStyles();

  const careerFormMethod = useFormContext<CareerType>();

  const field = name.split(".").length === 2 ? name.split(".")[1] : name;

  const referencePopoverTrigger = (
    name: Path<CareerType> | Path<AppointmentType> | Path<CertificationType>,
    content: string,
  ) => {
    setCurrentName(name);
    setCurrentContent(content);
    if (setCurrentArrayObjId && objArrId) setCurrentArrayObjId(objArrId);
    setIsOpenPopover(true);
    setEditMode(false);
  };

  const existingReference = React.useMemo(() => {
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
        return `${source.referenceType}\n${source.dateObtained}`;
      } else if (numOfSource > 1) {
        return `${source.referenceType}\n${source.dateObtained} + ${
          numOfSource - 1
        } more`;
      }
    }
    return "";
  }, [careerFormMethod.getValues()]);

  return (
    <>
      {isOpenPopover || existingReference ? (
        <Textarea
          w={190}
          ml={10}
          label={"References"}
          value={existingReference}
          size="xs"
          readOnly
          autoFocus={true}
          onClick={() => referencePopoverTrigger(name, content)}
          classNames={{
            input: classes.reference,
          }}
          disabled={
            isOpenPopover && currentName !== name && currentContent !== content
          }
        />
      ) : (
        <Button
          leftIcon={<IconCirclePlus />}
          variant={"white"}
          mt={24}
          onClick={() => referencePopoverTrigger(name, content)}
          disabled={disabled}
        >
          References
        </Button>
      )}
    </>
  );
};
