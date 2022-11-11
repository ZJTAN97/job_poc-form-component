import { Button, Popover, TextInput } from "@mantine/core";
import React from "react";
import {
  SchemaReference,
  SchemaReferenceType,
} from "../../../../validations/career";
import styles from "./index.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "../../../../components/Form";

interface MultiFieldProps<> {
  title: string;
  data: string[];
  references: SchemaReferenceType[];
  appliedField: string;
  appendHandler: (arg: string) => void; // to append the skills array specifically
  appendReference: (data: SchemaReferenceType) => void; // to append the references array; can I combine the 2?
}

export const MultiField = ({
  title,
  data,
  references,
  appliedField,
  appendHandler,
  appendReference,
}: MultiFieldProps) => {
  const [openPopup, setOpenPopup] = React.useState(false);
  const [textInput, setTextInput] = React.useState("");

  const referenceFormMethods = useForm<SchemaReferenceType>({
    resolver: zodResolver(SchemaReference),
    mode: "onChange",
    defaultValues: {
      field: appliedField,
      content: "",
      comments: "",
      dateObtained: "",
      referenceType: "LinkedIn",
    },
  });

  const {
    control: referenceFormControl,
    handleSubmit: referenceFormHandleSubmit,
  } = referenceFormMethods;

  const onClickHandler = referenceFormHandleSubmit(async (data) => {
    appendHandler(textInput);
    appendReference({ ...data, content: textInput });
    setOpenPopup(false);
  });

  return (
    <Popover width={200} position={"right-start"} withArrow opened={openPopup}>
      <Popover.Target>
        <div className={styles.header}>{title}</div>
      </Popover.Target>
      {data.map((item, id) => (
        <div className={styles.item} key={item.toString() + id}>
          {item}
          <span className={styles.reference__text}>
            {Object.entries(references.filter((ref) => ref.content === item)[0])
              .slice(2)
              .map((object) => object[1] + " | ")}
          </span>
        </div>
      ))}
      <div className={styles.append__array_btn}>
        <div
          className={styles.circular__add}
          onClick={() => setOpenPopup(!openPopup)}
        >
          +
        </div>{" "}
        Add Skills
      </div>
      <Popover.Dropdown>
        <TextInput
          label={"Value"}
          className={styles.skills__input}
          onChange={(e) => {
            setTextInput(e.target.value);
          }}
        />
        <Form
          methods={referenceFormMethods}
          preventLeaving={true}
          useLocalStorage={false}
        >
          <Form.Dropdown
            label={"Reference Type"}
            control={referenceFormControl}
            name={"referenceType"}
            data={["LinkedIn", "Glassdoor", "Others"]}
            className={styles.input__fields}
          />
          <Form.TextInput
            label={"Comments"}
            name={"comments"}
            control={referenceFormControl}
            className={styles.input__fields}
          />
          <Form.TextInput
            label={"Date of Origin"}
            name={"dateObtained"}
            control={referenceFormControl}
            className={styles.input__fields}
          />
        </Form>
        <Button
          className={styles.append__btn}
          onClick={onClickHandler}
          size={"xs"}
          variant={"outline"}
          disabled={!(textInput.length > 0)}
        >
          Add {title}
        </Button>
      </Popover.Dropdown>
    </Popover>
  );
};
