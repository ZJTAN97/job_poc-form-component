import { Button, Popover, TextInput } from "@mantine/core";
import React from "react";

import styles from "./index.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../../../../components/Form";
import {
  GetReferenceTypeKey,
  Reference,
  ReferenceType,
  TYPES_OF_REFERENCES,
} from "../../../../../../data/common/Reference";

interface MultiFieldProps {
  title: string;
  data: string[];
  references: ReferenceType[];
  appliedField: string;
  appendHandler: (arg: string) => void; // to append the skills array specifically
  appendReference: (data: ReferenceType) => void; // to append the references array; can I combine the 2?
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

  const referenceFormMethods = useForm<ReferenceType>({
    resolver: zodResolver(Reference),
    mode: "onChange",
    defaultValues: {
      field: appliedField,
      content: "",
      comments: "",
      dateObtained: "",
      referenceType: TYPES_OF_REFERENCES.FACEBOOK,
    },
  });

  const {
    control: referenceFormControl,
    handleSubmit: referenceFormHandleSubmit,
  } = referenceFormMethods;

  const onClickHandler = referenceFormHandleSubmit((data) => {
    appendHandler(textInput);
    appendReference({
      ...data,
      content: textInput,
      referenceType: GetReferenceTypeKey(data.referenceType),
    });
    setOpenPopup(false);
    setShowAddValue(false);
  });

  const [showAddValue, setShowAddValue] = React.useState(false);

  console.log("--data--");
  console.log(data);

  return (
    <Popover
      width={200}
      position={"right-start"}
      withArrow
      opened={openPopup}
      closeOnClickOutside // TODO: fix this
      closeOnEscape // TODO: fix this
    >
      <div className={styles.main__container}>
        <div className={styles.container__col_label}>Skill Sets</div>
        <div className={styles.container__col_content}>
          <div>{title}</div>
          {data.map((item, id) => (
            <div className={styles.item} key={item.toString() + id}>
              {item}
              <span className={styles.reference__text}>
                {Object.entries(
                  references.filter((ref) => ref.content === item)[0],
                )
                  .slice(2)
                  .map((object) => object[1] + " | ")}
              </span>
            </div>
          ))}
          {showAddValue ? (
            <TextInput
              onChange={(e) => {
                setTextInput(e.target.value);
              }}
              rightSectionWidth={100}
              rightSection={
                textInput.length > 0 && (
                  <Popover.Target>
                    <div className={styles.append__array_btn}>
                      Add Ref
                      <div
                        className={styles.circular__add}
                        onClick={() => setOpenPopup(!openPopup)}
                      >
                        +
                      </div>
                    </div>
                  </Popover.Target>
                )
              }
            />
          ) : (
            <div
              className={styles.add__to_array}
              onClick={() => setShowAddValue(true)}
            >
              Add skills
            </div>
          )}
        </div>
      </div>

      <Popover.Dropdown>
        <Form
          methods={referenceFormMethods}
          preventLeaving={true}
          useLocalStorage={false}
        >
          <Form.Dropdown
            label={"Reference Type"}
            control={referenceFormControl}
            name={"referenceType"}
            data={Object.values(TYPES_OF_REFERENCES)}
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
