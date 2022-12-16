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
import { useFormContext, Path, useForm, useFieldArray } from "react-hook-form";
import {
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
  const { currentField, setEditMode, setOpenPanel } = referenceStateContext!;

  const currentContent = useCurrentContent<CareerType>({
    formMethods: formContext,
    currentField: currentField as Path<CareerType>,
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
  };

  const handleClosePanel = () => {
    setEditMode(true);
    setOpenPanel(false);
  };

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
                    onClick={() => {}} // TODO
                  />
                  <IconIdOff
                    size={20}
                    style={{ cursor: "pointer" }}
                    onClick={() => {}}
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
          onClick={() => {}} // TODO
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
        onClick={handleClosePanel} // TODO
        variant={"subtle"}
        leftIcon={<IconArrowLeft />}
      >
        Confirm and close panel
      </Button>
    </Popover.Dropdown>
  );
};
