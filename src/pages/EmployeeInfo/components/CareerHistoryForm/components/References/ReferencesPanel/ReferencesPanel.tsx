import React from "react";
import { CareerType } from "../../../../../../../model/career/Career";
import { useReferenceStateContext } from "../References";
import {
  ButtonRow,
  ReferenceCard,
  ReferenceCardRow,
  Title,
  TitleContainer,
  useStyles,
} from "./styles";
import { useFormContext, useForm, useFieldArray } from "react-hook-form";
import {
  setReferences,
  useCurrentContent,
  useCurrentReference,
  useExistingReference,
} from "../utils";
import {
  Reference,
  ReferenceType,
} from "../../../../../../../model/common/Reference";
import { zodResolver } from "@hookform/resolvers/zod";
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

export const ReferencesPanel = () => {
  const { classes } = useStyles();

  const formContext = useFormContext<CareerType>();
  const referenceStateContext = useReferenceStateContext();
  const {
    currentField,
    setEditMode,
    setOpenPanel,
    currentArrayId,
    lastSource,
    setLastSource,
  } = referenceStateContext!;

  const currentContent = useCurrentContent({
    formMethods: formContext,
    currentField: currentField!,
    currentArrayId,
  });

  const existingReference = useExistingReference({
    references: [
      ...formContext.getValues().references,
      ...formContext.getValues().appointment.references,
      ...formContext
        .getValues()
        .certsToField.map((cert) => cert.references)
        .flat(),
    ],
    field: currentField!,
    content: currentContent,
  }).filteredReference;

  const referenceFormMethod = useForm<ReferenceType>({
    resolver: zodResolver(Reference),
    mode: "onChange",
    defaultValues: {
      field: currentField,
      content: currentContent,
      sources: [],
    },
  });

  const sourceFormMethod = useForm<SourceType>({
    resolver: zodResolver(Source),
    mode: "onChange",
    defaultValues: {
      comment: "",
      dateObtained: "2022-11-11T12:19:54.52",
      referenceType: undefined,
    },
  });

  const referenceArrayMethods = useFieldArray<CareerType>({
    control: formContext.control,
    name: useCurrentReference(currentField!),
  });

  const sourceArrayMethods = useFieldArray<ReferenceType>({
    control: referenceFormMethod.control,
    name: "sources",
  });

  const [popupMode, setPopupMode] = React.useState<"edit" | "read">(
    existingReference ? "read" : "edit",
  );
  const [showCommentsInput, setShowCommentsInput] = React.useState(false);
  const [sourceId, setSourceId] = React.useState<number>();

  const appendReferences = () => {
    if (sourceId !== undefined) {
      sourceArrayMethods.update(sourceId, sourceFormMethod.getValues());
      setSourceId(undefined);
    } else {
      sourceArrayMethods.append(sourceFormMethod.getValues());
    }
    setReferences({
      arrayMethod: referenceArrayMethods,
      currentArrayId,
      fieldName: currentField!,
      formContext,
      referenceForm: referenceFormMethod,
      existingReference,
    });

    setLastSource(sourceFormMethod.getValues());
    sourceFormMethod.reset();
    setPopupMode("read");
  };

  const editSource = (providedSourceId: number) => {
    setSourceId(providedSourceId);
    sourceFormMethod.setValue(
      "referenceType",
      referenceFormMethod.getValues().sources[providedSourceId].referenceType,
    );
    sourceFormMethod.setValue(
      "dateObtained",
      referenceFormMethod.getValues().sources[providedSourceId].dateObtained,
    );
    sourceFormMethod.setValue(
      "comment",
      referenceFormMethod.getValues().sources[providedSourceId].comment,
    );
    setPopupMode("edit");
  };

  const deleteSource = (providedSourceId: number) => {
    // TODO: handle all scenarios
    sourceArrayMethods.remove(providedSourceId);
    const referenceId = formContext
      .getValues()
      .references.indexOf(existingReference);
    referenceArrayMethods.update(referenceId, referenceFormMethod.getValues());

    if (referenceFormMethod.getValues().sources.length === 0) {
      if (currentField === "name" || currentField === "issuedBy") {
        const selectedCert =
          formContext.getValues().certsToField[currentArrayId];
        referenceArrayMethods.update(currentArrayId, {
          ...selectedCert,
          references: [],
        });
      } else {
        referenceArrayMethods.remove(referenceId);
      }
      setPopupMode("edit");
    }
  };

  const handleClosePanel = () => {
    setEditMode(true);
    setOpenPanel(false);
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

  console.info(referenceFormMethod.getValues());

  return (
    <Popover.Dropdown p={30}>
      <TitleContainer>
        <Title>References</Title>
        {existingReference?.sources.length > 0 ? (
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
          {existingReference.sources.map((item, id) => (
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
                    onClick={() => deleteSource(id)}
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
          onClick={appendReferences}
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
