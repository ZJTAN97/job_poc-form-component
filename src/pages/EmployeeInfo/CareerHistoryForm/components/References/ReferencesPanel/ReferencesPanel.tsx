import { useReferenceStateContext } from "../References";
import { ButtonRow, Title, TitleContainer, useStyles } from "./styles";
import { Button, Popover } from "@mantine/core";
import { IconArrowLeft, IconCirclePlus } from "@tabler/icons";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Reference,
  ReferenceType,
  TYPES_OF_REFERENCES,
} from "../../../../../../model/References";
import { Form } from "../../../../../../components/Form";
import { CareerType } from "../../../../../../model/Career";

export const ReferencesPanel = () => {
  const { classes } = useStyles();

  const formMethods = useFormContext<CareerType>();

  const referenceStateContext = useReferenceStateContext();
  const { setOpenPanel, currentField, currentArrayId } = referenceStateContext!;

  const referenceArrayMethods = useFieldArray<CareerType>({
    control: formMethods.control,
    name: `${currentField}${
      currentArrayId !== undefined ? `.${currentArrayId}.` : ""
    }.references` as any,
  });

  const referenceFormMethods = useForm<ReferenceType>({
    resolver: zodResolver(Reference),
    mode: "onChange",
    defaultValues: {
      referenceType: undefined,
      appliedTo: currentField,
      comment: "",
      dateObtained: "",
    },
  });

  const handleSubmit = referenceFormMethods.handleSubmit(async (data) => {
    console.log("-- submitted reference form --");
    console.log(data);
    referenceArrayMethods.append(data);
  });

  return (
    <Popover.Dropdown p={45}>
      <TitleContainer>
        <Title>References</Title>
        <IconCirclePlus
          size={20}
          style={{ cursor: "pointer" }}
          className={classes.addIconBtn}
        />
      </TitleContainer>

      <Form methods={referenceFormMethods}>
        <Form.Dropdown
          mt={25}
          label={"Type"}
          data={Object.values(TYPES_OF_REFERENCES)}
          name="referenceType"
        />
        <Form.TextInput mt={25} label={"Date Obtained"} name="dateObtained" />
        <Form.TextInput mt={25} label={"Comments"} name="comment" />
      </Form>

      <ButtonRow>
        <Button
          classNames={{
            root: classes.applyBtn,
          }}
          size={"xs"}
          variant="outline"
          onClick={handleSubmit}
        >
          Apply
        </Button>
      </ButtonRow>

      <Button
        classNames={{
          root: classes.returnBtn,
        }}
        mt={50}
        variant={"subtle"}
        leftIcon={<IconArrowLeft />}
        onClick={() => setOpenPanel(false)}
      >
        Confirm and close panel
      </Button>
    </Popover.Dropdown>
  );
};
