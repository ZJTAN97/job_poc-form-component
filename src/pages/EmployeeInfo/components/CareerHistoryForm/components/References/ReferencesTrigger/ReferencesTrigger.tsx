import { MassApplyingFields, useReferenceStateContext } from "../References";
import { TriggerRow, useStyles } from "./styles";
import { useFormContext, Path } from "react-hook-form";
import { CareerType } from "../../../../../../../model/career/Career";
import { AppointmentType } from "../../../../../../../model/career/Appointment";
import { CertificationType } from "../../../../../../../model/career/Certification";
import { Button, Checkbox, Textarea } from "@mantine/core";
import { useExistingReference } from "../hooks";
import { IconCirclePlus } from "@tabler/icons";
import React from "react";

interface ReferencesTriggerProp {
  /** Field Name required to filter which references to show for this component instance */
  field: Path<CareerType> | Path<AppointmentType> | Path<CertificationType>;

  /** Disable trigger */
  disabled?: boolean;

  arrId?: number;
}

export const ReferencesTrigger = ({
  field,
  disabled,
  arrId,
}: ReferencesTriggerProp) => {
  const { classes } = useStyles();

  const referenceStateContext = useReferenceStateContext();
  const formContext = useFormContext<CareerType>();

  const {
    openPanel,
    setOpenPanel,
    currentArrayId,
    setCurrentArrayId,
    currentField,
    setCurrentField,
    isMassApply,
    massApplyingFields,
    handleMassApplyingFields,
  } = referenceStateContext!;

  const handlePanelOpen = () => {
    setOpenPanel(true);
    setCurrentField(field);
    if (arrId !== undefined) {
      setCurrentArrayId(arrId);
    } else {
      setCurrentArrayId(undefined);
    }
  };

  const existingReference = useExistingReference({
    formValue: formContext.getValues(),
    field: field as Path<CareerType>,
    arrayId: arrId,
  });

  const handleCheckBox = (checked: boolean) => {
    const checkedItem: MassApplyingFields = {
      field,
      arrayId: arrId,
    };

    if (checked) {
      handleMassApplyingFields.append(checkedItem);
    } else {
      handleMassApplyingFields.setState((current) =>
        current.filter(
          (item) => JSON.stringify(item) !== JSON.stringify(checkedItem),
        ),
      );
    }
  };

  const referencesErrors = formContext.formState.errors as unknown as {
    [key: string]: { message: string };
  }; // TODO: give a better typing when the errors are more stable

  return (
    <>
      {openPanel || existingReference.stringText ? (
        <TriggerRow>
          {isMassApply && disabled ? (
            <Checkbox
              mt={30}
              ml={10}
              mr={10}
              checked={
                massApplyingFields.filter(
                  (item) => item.field === field && item.arrayId === arrId,
                ).length === 1
              }
              onChange={(e) => handleCheckBox(e.currentTarget.checked)}
            />
          ) : (
            <div style={{ width: "40px" }}></div>
          )}
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
            disabled={
              (openPanel && currentField !== field) ||
              (currentArrayId !== undefined && currentArrayId !== arrId)
            }
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
