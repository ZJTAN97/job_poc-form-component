import { TriggerRow, useStyles } from "./styles";
import { useFormContext, Path } from "react-hook-form";
import { CareerType } from "../../../../../../../model/career/Career";
import { AppointmentType } from "../../../../../../../model/career/Appointment";
import { CertificationType } from "../../../../../../../model/career/Certification";
import { Button, Checkbox, Textarea } from "@mantine/core";
import { IconCirclePlus } from "@tabler/icons";
import { getExistingReference } from "../utils";
import { MassApplyingFields, useReferenceStateContext } from "../References";

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

  const formContext = useFormContext<CareerType>();

  const referenceStateContextNew = useReferenceStateContext();
  const {
    dispatch,
    openPanel,
    currentArrayId,
    currentField,
    isMassApply,
    massAppliedFields,
    setMassAppliedFields,
  } = referenceStateContextNew;

  const handlePanelOpen = () => {
    dispatch({
      type: "EDIT_ONE",
      currentField: field,
      currentArrayId: arrId,
    });
  };

  const existingReference = getExistingReference({
    formMethodValue: formContext.getValues(),
    field: field as Path<CareerType>,
    arrayId: arrId,
  });

  const handleCheckBox = (checked: boolean) => {
    const checkedItem: MassApplyingFields = {
      field,
      arrayId: arrId,
    };
    if (checked) {
      setMassAppliedFields.append(checkedItem);
    } else {
      setMassAppliedFields.setState((current) =>
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
                massAppliedFields.filter(
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
