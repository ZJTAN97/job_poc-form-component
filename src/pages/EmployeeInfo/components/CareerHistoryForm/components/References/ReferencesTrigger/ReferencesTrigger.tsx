import { useReferenceStateContext } from "../References";
import { TriggerRow, useStyles } from "./styles";
import { useFormContext, Path } from "react-hook-form";
import { CareerType } from "../../../../../../../model/career/Career";
import { AppointmentType } from "../../../../../../../model/career/Appointment";
import { CertificationType } from "../../../../../../../model/career/Certification";
import { Button, Textarea } from "@mantine/core";
import { useExistingReference } from "../utils";
import { IconCirclePlus } from "@tabler/icons";

interface ReferencesTriggerProp {
  /** Field Name required to filter which references to show for this component instance */
  field: Path<CareerType> | Path<AppointmentType> | Path<CertificationType>;

  /** Content required to filter which references to show for this component instance */
  content: string;

  /** Disable trigger */
  disabled?: boolean;

  arrId?: number;
}

export const ReferencesTrigger = ({
  field,
  content,
  disabled,
  arrId,
}: ReferencesTriggerProp) => {
  const { classes } = useStyles();

  const referenceStateContext = useReferenceStateContext();
  const formContext = useFormContext<CareerType>();

  const {
    openPanel,
    setOpenPanel,
    setCurrentArrayId,
    editMode,
    setEditMode,
    currentField,
    setCurrentField,
  } = referenceStateContext!;

  const handlePanelOpen = () => {
    setOpenPanel(true);
    setEditMode(false);
    setCurrentField(field);
    if (arrId !== undefined) {
      setCurrentArrayId(arrId);
    }
  };

  const existingReference = useExistingReference({
    references: [
      ...formContext.getValues().references,
      ...formContext.getValues().appointment.references,
      ...formContext
        .getValues()
        .certsToField.map((cert) => cert.references)
        .flat(),
    ],
    field,
    content,
  });

  const referencesErrors = formContext.formState.errors as unknown as {
    [key: string]: { message: string };
  }; // TODO: give a better typing when the errors are more stable

  return (
    <>
      {openPanel || existingReference.stringText ? (
        <TriggerRow>
          <Textarea
            w={190}
            ml={10}
            label={"References"}
            value={existingReference.stringText}
            size="xs"
            readOnly
            onClick={existingReference ? () => handlePanelOpen() : () => {}}
            classNames={{
              input: classes.reference,
            }}
            disabled={openPanel && currentField !== field}
          />
        </TriggerRow>
      ) : (
        <Button
          leftIcon={<IconCirclePlus />}
          variant="white"
          mt={24}
          ml={50}
          color={referencesErrors.references_company && "red"}
          onClick={() => handlePanelOpen()}
          disabled={!disabled}
        >
          {referencesErrors.references_company
            ? "References required"
            : "Add references"}
        </Button>
      )}
    </>
  );
};
