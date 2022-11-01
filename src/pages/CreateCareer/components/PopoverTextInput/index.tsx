import { Popover, SelectProps } from "@mantine/core";
import React from "react";
import Form from "../../../../components/Form";
import { Control, useForm } from "react-hook-form";
import styles from "./index.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { SchemaSOI, SchemaSOIType } from "../../../../validations/career";

interface PopoverInputProps {
  label?: string;
  open: boolean;
  setOpen: (arg: boolean) => void;
  existingSOIdata?: SchemaSOIType[];
  parentFormName: string;
  parentFormControl: Control<any>;
}

const PopoverTextInput = ({
  label,
  open,
  setOpen,
  parentFormName,
  parentFormControl,
}: PopoverInputProps) => {
  const methods = useForm<SchemaSOIType>({
    resolver: zodResolver(SchemaSOI),
    mode: "onChange",
    defaultValues: {
      source: "Last updated",
      sourceType: "type1",
      sourceSubType: "subtype1",
      dateObtained: new Date(),
      comments: "",
      serial: "",
    },
  });

  const { formState, handleSubmit, control, getValues, watch } = methods;

  // console.log("[INFO] SOI Form: ");
  // console.log(watch());

  console.log("[INFO] Errors in SOI Form");
  console.log(formState.errors);

  // TODO: Resolve no change error when switching source types

  return (
    <div className={styles.popover__flex}>
      <Popover
        width={350}
        withArrow
        shadow="md"
        position="right"
        opened={open}
        onClose={() => setOpen(false)}
      >
        <Popover.Target>
          <div
            onFocusCapture={() => setOpen(true)}
            className={styles.popover__container}
          >
            <Form.TextInput
              label={label}
              name={parentFormName}
              control={parentFormControl}
              required={true}
            />
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <Form
            methods={methods}
            preventLeaving={false}
            useLocalStorage={false}
          >
            <Form.Dropdown
              label={"Select Source"}
              className={styles.dropdowns}
              control={control}
              name={"source"}
              defaultValue={getValues().source}
              data={["Last updated", "Create new"]}
            />
            {getValues().source === "Last updated" ? (
              <div>Last 3 updated stuf</div>
            ) : (
              <>
                <Form.Dropdown
                  label={"Type"}
                  className={styles.dropdowns}
                  control={control}
                  name={"sourceType"}
                  defaultValue={"type1"}
                  data={["type1", "type2", "type3", "type4"]}
                />
                <Form.Dropdown
                  label={"Sub Type"}
                  className={styles.dropdowns}
                  control={control}
                  name={"sourceType"}
                  defaultValue={"subtype1"}
                  data={["subtype1", "subtype2", "subtype3", "subtype4"]}
                />
                <Form.TextInput
                  label={"Serial"}
                  className={styles.dropdowns}
                  control={control}
                  name={"serial"}
                />
                <Form.TextInput
                  label={"Comment"}
                  className={styles.dropdowns}
                  control={control}
                  name={"comments"}
                />
              </>
            )}
          </Form>
        </Popover.Dropdown>
      </Popover>
      <Form.TextInput
        label={"SOI | DATE"}
        name={"company"}
        control={control}
        className={styles.popover__soi_input}
        disabled={true}
      />
    </div>
  );
};

export default PopoverTextInput;
