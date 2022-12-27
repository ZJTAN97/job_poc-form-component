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
import { useSetSources } from "../utils";

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

export const ReferencesPanel = () => {
  const { classes } = useStyles();

  const referenceStateContext = useReferenceStateContext();
  const {
    currentField,
    setCurrentField,
    setOpenPanel,
    currentArrayId,
    setCurrentArrayId,
    lastSource,
    setLastSource,
    massApplyingFields,
    setMassApplyingFields,
  } = referenceStateContext!;

  const {
    sourceFormMethod,
    referenceFormMethod,
    applySourcesToReferences,
    massApplySourcesToAllReferences,
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
    setMassApplyingFields(undefined);
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
          onClick={
            massApplyingFields !== undefined
              ? massApplySourcesToAllReferences
              : applySourcesToReferences
          }
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
