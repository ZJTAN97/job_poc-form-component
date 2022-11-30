import { Button, Popover } from "@mantine/core";
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
import { IconArrowLeft, IconCirclePlus, IconEdit } from "@tabler/icons";
import { CareerType } from "../../../../../../model/career/Career";
import { useFieldArray, useFormContext, useForm, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../../../../components/Form";
import {
  Reference,
  ReferenceType,
} from "../../../../../../model/common/Reference";

interface ReferencePopupProps {
  setIsOpenPopover: (arg: boolean) => void;
  setEditMode: (arg: boolean) => void;
  selectedRef?: Path<CareerType>;
}

export const ReferencePopup = ({
  setIsOpenPopover,
  setEditMode,
  selectedRef,
}: ReferencePopupProps) => {
  const { classes } = useStyles();

  const [mode, setMode] = React.useState<"edit" | "read">("edit");
  const [showCommentsInput, setShowCommentsInput] = React.useState(false);

  const careerFormMethod = useFormContext<CareerType>();

  const referenceFormMethod = useForm<ReferenceType>({
    resolver: zodResolver(Reference),
    mode: "onChange",
    defaultValues: {
      content: "",
      field: selectedRef,
      sources: [],
    },
  });

  const sourceFormMethod = useForm<SourceType>({
    resolver: zodResolver(Source),
    mode: "onChange",
    defaultValues: {
      comment: "",
      dateObtained: "",
      referenceType: TYPES_OF_REFERENCES.REDDIT,
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

  const appendSources = sourceFormMethod.handleSubmit(async (data) => {
    sourceArrayMethods.append(data);
    console.log(referenceFormMethod.getValues());
    referenceArrayMethods.append(referenceFormMethod.getValues());
    setMode("read");
  });

  const saveReferencesAndReturn = referenceFormMethod.handleSubmit(
    async (data) => {
      setIsOpenPopover(false);
      setEditMode(true);
    },
  );

  return (
    <Popover.Dropdown p={30}>
      <TitleContainer>
        <Title>References</Title>
        <IconCirclePlus
          size={20}
          style={{ cursor: "pointer" }}
          onClick={() => setMode("edit")}
        />
      </TitleContainer>

      {mode === "edit" ? (
        <Form
          methods={sourceFormMethod}
          preventLeaving={true}
          useLocalStorage={true}
        >
          <Form.Dropdown
            name={"referenceType"}
            control={sourceFormMethod.control}
            mt={20}
            mb={20}
            label={"Select source"}
            data={Object.values(TYPES_OF_REFERENCES)}
          />
          <Form.TextInput
            name={"dateObtained"}
            control={sourceFormMethod.control}
            mb={20}
            label={"Date Obtained"}
          />
          {showCommentsInput ? (
            <Form.TextInput
              name={"comment"}
              control={sourceFormMethod.control}
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
          {referenceFormMethod.getValues().sources.map((item) => (
            <ReferenceCard>
              <div>{item.referenceType}</div>
              <ReferenceCardRow>
                <div>{item.dateObtained}</div>
                <IconEdit
                  size={20}
                  style={{ cursor: "pointer" }}
                  onClick={() => setMode("edit")}
                />
              </ReferenceCardRow>
              <div>{item.comment}</div>
            </ReferenceCard>
          ))}
        </div>
      )}

      <ButtonRow>
        {mode === "edit" && (
          <Button size={"xs"} variant="subtle" onClick={() => setMode("read")}>
            Cancel
          </Button>
        )}
        <Button
          classNames={{
            root: classes.applyBtn,
          }}
          size={"xs"}
          variant="outline"
          onClick={appendSources}
        >
          Apply
        </Button>
      </ButtonRow>

      <Button
        classNames={{
          root: classes.returnBtn,
        }}
        mt={50}
        onClick={saveReferencesAndReturn}
        variant={"subtle"}
        leftIcon={<IconArrowLeft />}
      >
        Save references and return
      </Button>
    </Popover.Dropdown>
  );
};
