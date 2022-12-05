import { Button, Popover, Select, TextInput } from "@mantine/core";
import React from "react";
import {
  Source,
  SourceType,
  TYPES_OF_REFERENCES,
} from "../../../../../../model/common/Source";
import {
  ButtonRow,
  ReferenceCard,
  ReferenceCardRow,
  Title,
  TitleContainer,
  useStyles,
} from "./styles";
import {
  IconArrowLeft,
  IconCirclePlus,
  IconEdit,
  IconIdOff,
} from "@tabler/icons";
import { CareerType } from "../../../../../../model/career/Career";
import { useFieldArray, useFormContext, useForm, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Reference,
  ReferenceType,
} from "../../../../../../model/common/Reference";
import { Form } from "../../../../../../components/Form";

interface ReferencePopupProps {
  setIsOpenPopover: (arg: boolean) => void;

  /** set main career form to be able to edit */
  setEditMode: (arg: boolean) => void;

  /** Field name required to populate reference object */
  currentName?: Path<CareerType>;

  /** Content required to populate reference object */
  content: string;
}

export const ReferencePopup = ({
  setIsOpenPopover,
  setEditMode,
  currentName,
  content,
}: ReferencePopupProps) => {
  const { classes } = useStyles();

  const careerFormMethod = useFormContext<CareerType>();

  const referenceFormMethod = useForm<ReferenceType>({
    resolver: zodResolver(Reference),
    mode: "onChange",
    defaultValues: {
      content: content,
      field: currentName,
      sources: [],
    },
  });

  const existingReference = React.useMemo(() => {
    return careerFormMethod
      .getValues()
      .references.filter(
        (ref) => ref.field === currentName && ref.content === content,
      )[0];
  }, [careerFormMethod.getValues().references]);

  console.log("--existingReference--");
  console.log(existingReference);

  const [popupMode, setPopupMode] = React.useState<"edit" | "read">(
    existingReference ? "read" : "edit",
  );

  const [currentSourceId, setCurrentSourceId] = React.useState<number>();

  const [showCommentsInput, setShowCommentsInput] = React.useState(false);

  const sourceFormMethod = useForm<SourceType>({
    resolver: zodResolver(Source),
    mode: "onChange",
    defaultValues: {
      comment: "",
      dateObtained: "",
      referenceType: TYPES_OF_REFERENCES.FACEBOOK,
    },
  });

  const referenceArrayMethods = useFieldArray<CareerType>({
    control: careerFormMethod.control,
    name: "references",
  });

  const sourceArrayMethods = useFieldArray<ReferenceType>({
    control: referenceFormMethod.control,
    name: "sources",
  });

  const submitReferences = () => {
    if (currentSourceId !== undefined) {
      sourceArrayMethods.update(currentSourceId, sourceFormMethod.getValues());
    } else {
      sourceArrayMethods.append(sourceFormMethod.getValues());
    }

    if (existingReference) {
      const id = careerFormMethod
        .getValues()
        .references.indexOf(existingReference);
      referenceArrayMethods.update(id, referenceFormMethod.getValues());
    } else {
      referenceArrayMethods.append(referenceFormMethod.getValues());
    }
    sourceFormMethod.reset();
    setPopupMode("read");
    setCurrentSourceId(undefined);
  };

  const editSource = (id: number) => {
    setCurrentSourceId(id);
    const source = existingReference.sources[id];
    setPopupMode("edit");
    sourceFormMethod.setValue("referenceType", source.referenceType);
    sourceFormMethod.setValue("comment", source.comment);
    sourceFormMethod.setValue("dateObtained", source.dateObtained);
  };

  const deleteSource = (id: number) => {
    sourceArrayMethods.remove(id);
    const referenceId = careerFormMethod
      .getValues()
      .references.indexOf(existingReference);
    referenceArrayMethods.update(referenceId, referenceFormMethod.getValues());

    if (referenceFormMethod.getValues().sources.length === 0) {
      setPopupMode("edit");
    }
  };

  const handleClosePanel = () => {
    setEditMode(true);
    setIsOpenPopover(false);
  };

  console.log("-- currentSourceId --");
  console.log(currentSourceId);

  return (
    <Popover.Dropdown p={30}>
      <TitleContainer>
        <Title>References</Title>
        {referenceFormMethod.getValues().sources.length > 0 && (
          <IconCirclePlus
            size={20}
            style={{ cursor: "pointer" }}
            onClick={() => setPopupMode("edit")}
            className={classes.addIconBtn}
          />
        )}
      </TitleContainer>

      {popupMode === "edit" ? (
        <Form methods={sourceFormMethod}>
          <Form.Dropdown
            control={sourceFormMethod.control}
            name={"referenceType"}
            mt={20}
            mb={20}
            label={"Select source"}
            data={Object.values(TYPES_OF_REFERENCES)}
          />
          <Form.TextInput
            control={sourceFormMethod.control}
            name={"dateObtained"}
            mb={20}
            label={"Date Obtained"}
          />
          {showCommentsInput ? (
            <Form.TextInput
              control={sourceFormMethod.control}
              name={"comment"}
              mb={20}
              label={"Comments"}
            />
          ) : (
            <Button
              leftIcon={<IconCirclePlus />}
              size={"xs"}
              variant={"subtle"}
              onClick={() => setShowCommentsInput(true)}
            >
              Comment
            </Button>
          )}
        </Form>
      ) : (
        <div>
          {existingReference.sources.map((item, id) => (
            <ReferenceCard key={"refCard" + id}>
              <div>{item.referenceType}</div>
              <ReferenceCardRow>
                <div>{item.dateObtained}</div>
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
            disabled={referenceFormMethod.getValues().sources.length === 0}
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
          onClick={submitReferences}
          disabled={popupMode === "read"}
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
