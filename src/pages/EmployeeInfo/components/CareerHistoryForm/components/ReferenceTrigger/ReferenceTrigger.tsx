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

  /** Set selected field to show references on the popup component */
  setCurrentName: (
    arg: Path<CareerType> | Path<AppointmentType> | Path<CertificationType>,
  ) => void;

  /** Currently selected content to show references on the popup component */
  currentContent: string;

  /** Set selected content to show references on the popup component */
  setCurrentContent: (arg: string) => void;

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
    setIsOpenPopover(true);
    setEditMode(false);
  };

  const existingReference = React.useMemo(() => {
    const allReferences = [
      ...careerFormMethod.getValues().references,
      ...careerFormMethod.getValues().appointment.references,
      ...careerFormMethod
        .getValues()
        .certs.map((cert) => cert.references)
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
          ml={10}
          label={"References"}
          value={existingReference}
          size="xs"
          readOnly
          autoFocus={currentName === name && currentContent === content}
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
