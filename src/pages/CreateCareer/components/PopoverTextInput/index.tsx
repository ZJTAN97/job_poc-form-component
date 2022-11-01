import { Popover, SelectProps } from "@mantine/core";
import React from "react";
import Form from "../../../../components/Form";
import { Control, useForm } from "react-hook-form";
import "./index.css";
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

  console.log("[INFO] SOI Form: ");
  console.log(watch());

  return (
    <div className="popover__flex">
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
            className={"popover__container"}
          >
            <Form.TextInput
              label={label}
              name={parentFormName}
              control={parentFormControl}
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
              className="dropdowns"
              control={control}
              name={"source"}
              defaultValue={"Last updated"}
              data={["Last updated", "Create new"]}
            />
            {getValues().source === "Last updated" ? (
              <div>Last 3 updated stuf</div>
            ) : (
              <>
                <Form.Dropdown
                  label={"Type"}
                  className="dropdowns"
                  control={control}
                  name={"sourceType"}
                  data={["type1", "type2", "type3", "type4"]}
                />
                <Form.Dropdown
                  label={"Sub Type"}
                  className="dropdowns"
                  control={control}
                  name={"sourceType"}
                  data={["subtype1", "subtype2", "subtype3", "subtype4"]}
                />
                <Form.TextInput
                  label={"Serial"}
                  className="dropdowns"
                  control={control}
                  name={"serial"}
                />
                <Form.TextInput
                  label={"Comment"}
                  className="dropdowns"
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
        className={"popover__soi_input"}
        disabled={true}
      />
    </div>
  );
};

export default PopoverTextInput;
