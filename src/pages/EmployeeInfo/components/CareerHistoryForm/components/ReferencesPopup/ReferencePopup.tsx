import { Button, Popover, Select, TextInput } from "@mantine/core";
import React from "react";
import { TYPES_OF_REFERENCES } from "../../../../../../model/common/Source";
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
import {
  Reference,
  ReferenceType,
} from "../../../../../../model/common/Reference";

interface ReferencePopupProps {
  setIsOpenPopover: (arg: boolean) => void;
  setEditMode: (arg: boolean) => void;
  selectedRef?: Path<CareerType>;
  content: string;
}

export const ReferencePopup = ({
  setIsOpenPopover,
  setEditMode,
  selectedRef,
  content,
}: ReferencePopupProps) => {
  const { classes } = useStyles();

  const [mode, setMode] = React.useState<"edit" | "read">("edit");
  const [showCommentsInput, setShowCommentsInput] = React.useState(false);

  const careerFormMethod = useFormContext<CareerType>();

  // const selectedReference = React.useMemo(() => {

  // }, [])

  const referenceFormMethod = useForm<ReferenceType>({
    resolver: zodResolver(Reference),
    mode: "onChange",
    defaultValues: {
      content: content,
      field: selectedRef,
      sources: [],
    },
  });

  // console.log(content);
  // console.log(referenceFormMethod.getValues());

  const referenceArrayMethods = useFieldArray<CareerType>({
    control: careerFormMethod.control,
    name: "references",
  });

  const sourceArrayMethods = useFieldArray<ReferenceType>({
    control: referenceFormMethod.control,
    name: "sources",
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
        {/* <IconCirclePlus
          size={20}
          style={{ cursor: "pointer" }}
          onClick={() => setMode("edit")}
        /> */}
      </TitleContainer>

      {mode === "edit" ? (
        <>
          <Select
            name={"referenceType"}
            mt={20}
            mb={20}
            label={"Select source"}
            data={Object.values(TYPES_OF_REFERENCES)}
            onChange={(value) =>
              sourceArrayMethods.append({
                comment: "",
                dateObtained: "",
                referenceType: value as TYPES_OF_REFERENCES,
              })
            }
          />
          <TextInput name={"dateObtained"} mb={20} label={"Date Obtained"} />
          {showCommentsInput ? (
            <TextInput name={"comment"} mb={20} label={"Comments"} />
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
        </>
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
