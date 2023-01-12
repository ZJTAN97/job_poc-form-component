import React from "react";
import {
  ButtonRow,
  ReferenceCard,
  ReferenceCardRow,
  Title,
  TitleContainer,
  useStyles,
} from "./styles";
import { useUpdateReferences } from "../hooks";
import { Button, Popover } from "@mantine/core";
import {
  IconArrowLeft,
  IconCirclePlus,
  IconEdit,
  IconIdOff,
} from "@tabler/icons";
import { Form } from "../../../../../../../components/Form";
import {
  Source,
  SourceType,
  TYPES_OF_REFERENCES,
} from "../../../../../../../model/common/Source";
import { CareerType } from "../../../../../../../model/career/Career";
import { Path, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getExistingReference } from "../utils";
import { useReferenceStateContext } from "../References";

export const ReferencesPanel = () => {
  const { classes } = useStyles();

  const referenceStateContextNew = useReferenceStateContext();
  const {
    dispatch,
    currentArrayId,
    currentField,
    isMassApply,
    massAppliedFields,
    setMassAppliedFields,
  } = referenceStateContextNew;

  const sourceFormMethod = useForm<SourceType>({
    resolver: zodResolver(Source),
    mode: "onChange",
    defaultValues: {
      comment: "",
      dateObtained: "2022-11-11T12:19:54.52",
      referenceType: undefined,
    },
  });

  const [sourceId, setSourceId] = React.useState<number>();

  const { updateReference } = useUpdateReferences();
  const formMethods = useFormContext<CareerType>();

  const existingReference = getExistingReference({
    formMethodValue: formMethods.getValues(),
    field: currentField as Path<CareerType>,
    arrayId: currentArrayId,
  }).filteredReference;

  const existingSources = existingReference?.sources ?? [];

  const [showCommentsInput, setShowCommentsInput] = React.useState(false);
  const [popupMode, setPopupMode] = React.useState<"edit" | "read">(
    existingSources.length > 0 ? "read" : "edit",
  );

  const handleClosePanel = () => {
    dispatch({
      type: "RESET_ALL",
    });
    setMassAppliedFields.setState([]);
  };

  const handleMassApply = sourceFormMethod.handleSubmit(async (data) => {
    massAppliedFields.forEach(({ field, arrayId }) => {
      updateReference({
        source: data,
        field,
        arrayId,
      });
    });
    setMassAppliedFields.setState([]);
    dispatch({
      type: "RESET_ALL",
    });
  });

  const editSource = (id: number) => {
    setSourceId(id);
    if (existingReference) {
      sourceFormMethod.setValue(
        "referenceType",
        existingReference.sources[id].referenceType,
      );
      sourceFormMethod.setValue(
        "dateObtained",
        existingReference.sources[id].dateObtained,
      );
      sourceFormMethod.setValue(
        "comment",
        existingReference.sources[id].comment,
      );
    }
    setPopupMode("edit");
  };

  const deleteSource = (id: number) => {
    updateReference({
      source: sourceFormMethod.getValues(),
      field: currentField as Path<CareerType>,
      arrayId: currentArrayId,
      sourceId: id,
    });
    sourceFormMethod.reset();
    if (existingReference.sources.length === 0) {
      setPopupMode("edit");
    }
  };

  const applySources = sourceFormMethod.handleSubmit((data) => {
    updateReference({
      source: data,
      field: currentField as Path<CareerType>,
      arrayId: currentArrayId,
      sourceId,
    });
    setSourceId(undefined);
    setPopupMode("read");
    sourceFormMethod.reset();
  });

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
        <Form methods={sourceFormMethod} preventLeaving useLocalStorage>
          <Form.Dropdown
            data={Object.values(TYPES_OF_REFERENCES)}
            mt={20}
            mb={30}
            name="referenceType"
            label={"Select source"}
          />
          <Form.TextInput
            name={"dateObtained"}
            mb={30}
            label={"Date Obtained"}
          />
          {showCommentsInput ? (
            <Form.TextInput name={"comment"} mb={30} label={"Comments"} />
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
                    onClick={() => editSource(id)}
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
            disabled={existingSources.length === 0}
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
          onClick={isMassApply ? handleMassApply : applySources}
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
