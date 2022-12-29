import React from "react";
import { useReferenceStateContext } from "../References";
import {
  ButtonRow,
  ReferenceCard,
  ReferenceCardRow,
  Title,
  TitleContainer,
  useStyles,
} from "./styles";
import { useExistingReference, useSetSources } from "../hooks";

import { Button, Popover } from "@mantine/core";
import {
  IconArrowLeft,
  IconCirclePlus,
  IconEdit,
  IconIdOff,
} from "@tabler/icons";
import { Form } from "../../../../../../../components/Form";
import {
  SourceType,
  TYPES_OF_REFERENCES,
} from "../../../../../../../model/common/Source";
import { CareerType } from "../../../../../../../model/career/Career";
import { Path, useFormContext } from "react-hook-form";

export const ReferencesPanel = () => {
  const { classes } = useStyles();

  const formContext = useFormContext<CareerType>();
  const referenceStateContext = useReferenceStateContext();
  const {
    currentField,
    setCurrentField,
    setOpenPanel,
    currentArrayId,
    setCurrentArrayId,
    lastSource,
    setLastSource,
    isMassApply,
    setIsMassApply,
    massApplyingFields,
    handleMassApplyingFields,
  } = referenceStateContext!;

  const {
    sourceFormMethod,
    referenceFormMethod,
    applySourcesToReferences,
    editSource,
    deleteSource,
    popupMode,
    setPopupMode,
    existingSources,
  } = useSetSources({
    fieldName: currentField!,
    currentArrayId,
    setLastSource,
  });

  const [showCommentsInput, setShowCommentsInput] = React.useState(false);

  const handleClosePanel = () => {
    setCurrentField(undefined);
    setCurrentArrayId(undefined);
    setOpenPanel(false);
    if (isMassApply) {
      handleMassApplyingFields.setState([]);
      setIsMassApply(false);
    }
  };

  const applyLastSource = () => {
    if (lastSource) {
      sourceFormMethod.setValue("referenceType", lastSource.referenceType);
      sourceFormMethod.setValue("dateObtained", lastSource.dateObtained);
      if (lastSource.comment.length > 0) {
        setShowCommentsInput(true);
        sourceFormMethod.setValue("comment", lastSource.comment);
      }
      console.log("[INFO ] Applied last filled references");
    }
  };

  formContext.getValues();

  const handleMassApply = () => {
    massApplyingFields.forEach((item) => {
      const existingReference = useExistingReference({
        formValue: formContext.getValues(),
        field: item.field as Path<CareerType>,
        arrayId: item.arrayId,
      }).filteredReference;

      referenceFormMethod.setValue("field", item.field);
      referenceFormMethod.setValue("sources", [
        ...referenceFormMethod.getValues().sources,
        sourceFormMethod.getValues(),
      ]);

      // 1. Handle Single Field Type
      if (item.field === "company" || item.field === "duration") {
        if (existingReference !== undefined) {
          const indexToReplace = formContext
            .getValues()
            .references.indexOf(existingReference);
          existingReference.sources.push(sourceFormMethod.getValues());
          formContext.getValues().references[indexToReplace] =
            existingReference;
        } else {
          formContext.setValue("references", [
            ...formContext.getValues().references,
            referenceFormMethod.getValues(),
          ]);
        }
        // 2. Handle Single Object Type
      } else if (item.field === "position" || item.field === "rank") {
        if (existingReference !== undefined) {
          const indexToReplace = formContext
            .getValues()
            .appointment.references.indexOf(existingReference);
          existingReference.sources.push(sourceFormMethod.getValues());
          formContext.getValues().appointment.references[indexToReplace] =
            existingReference;
        } else {
          formContext.setValue("appointment.references", [
            ...formContext.getValues().appointment.references,
            referenceFormMethod.getValues(),
          ]);
        }
        // 3. Handle String Array
      } else if (item.field === "skills") {
        const selectedRef = formContext
          .getValues()
          .references.filter((ref) => ref.content === String(item.arrayId))[0];
        selectedRef.sources.push(sourceFormMethod.getValues());
        let existingReferences = [...formContext.getValues().references];
        existingReferences[Number(item.arrayId)] = selectedRef;
        formContext.setValue("references", existingReferences);
        // 4. Handle Array of Objects
      } else if (item.field === "name" || item.field === "issuedBy") {
        const selectedCert =
          formContext.getValues().certsToField[Number(item.arrayId)];

        if (existingReference) {
          const indexToReplace =
            selectedCert.references.indexOf(existingReference);
          existingReference.sources.push(sourceFormMethod.getValues());
          selectedCert.references[indexToReplace] = existingReference;
        } else {
          selectedCert.references.push(referenceFormMethod.getValues());
        }

        let existingCerts = [...formContext.getValues().certsToField];
        existingCerts[Number(item.arrayId)] = selectedCert;

        formContext.setValue("certsToField", existingCerts);
      }
      referenceFormMethod.reset();
    });
    setOpenPanel(false);
    setIsMassApply(false);
    handleMassApplyingFields.setState([]);
  };

  return (
    <Popover.Dropdown p={30}>
      <TitleContainer>
        <Title>References</Title>
        {existingSources.length > 0 ? (
          <IconCirclePlus
            size={20}
            style={{ cursor: "pointer" }}
            onClick={() => setPopupMode("edit")}
            className={classes.addIconBtn}
          />
        ) : null}
      </TitleContainer>

      {popupMode === "edit" ? (
        <Form methods={sourceFormMethod}>
          {lastSource && (
            <Button
              size="xs"
              variant="subtle"
              p={0}
              mt={10}
              onClick={applyLastSource}
            >
              Apply last source
            </Button>
          )}
          <Form.Dropdown<SourceType>
            data={Object.values(TYPES_OF_REFERENCES)}
            mt={20}
            mb={30}
            name="referenceType"
            label={"Select source"}
          />
          <Form.TextInput<SourceType>
            name={"dateObtained"}
            mb={30}
            label={"Date Obtained"}
          />
          {showCommentsInput ? (
            <Form.TextInput<SourceType>
              name={"comment"}
              mb={30}
              label={"Comments"}
            />
          ) : (
            <Button
              leftIcon={<IconCirclePlus />}
              size={"xs"}
              variant={"outline"}
              onClick={() => setShowCommentsInput(true)}
            >
              Comment
            </Button>
          )}
        </Form>
      ) : (
        <div>
          {existingSources.map((item, id) => (
            <ReferenceCard key={"ref_card_" + id}>
              <div>{item.referenceType}</div>
              <ReferenceCardRow>
                <div>{item.dateObtained.slice(0, 10)}</div>
                <div>
                  <IconEdit
                    size={20}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      editSource(id);
                    }}
                  />
                  <IconIdOff
                    size={20}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      deleteSource(id);
                    }}
                  />
                </div>
              </ReferenceCardRow>
              <div>{item.comment}</div>
            </ReferenceCard>
          ))}
        </div>
      )}

      <ButtonRow>
        {popupMode === "edit" && (
          <Button
            size={"xs"}
            variant="subtle"
            onClick={() => setPopupMode("read")}
            disabled={referenceFormMethod.getValues()?.sources?.length === 0}
          >
            Cancel
          </Button>
        )}
        <Button
          classNames={{
            root: classes.applyBtn,
          }}
          size={"xs"}
          variant="outline"
          onClick={isMassApply ? handleMassApply : applySourcesToReferences}
          disabled={popupMode === "read" || !sourceFormMethod.formState.isValid}
        >
          Apply
        </Button>
      </ButtonRow>

      <Button
        classNames={{
          root: classes.returnBtn,
        }}
        mt={50}
        onClick={handleClosePanel}
        variant={"subtle"}
        leftIcon={<IconArrowLeft />}
      >
        Confirm and close panel
      </Button>
    </Popover.Dropdown>
  );
};
