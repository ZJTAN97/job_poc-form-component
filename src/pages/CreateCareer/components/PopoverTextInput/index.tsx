import { Button, Popover, Select, TextInput, ThemeIcon } from "@mantine/core";
import React from "react";
import Form from "../../../../components/Form";
import { Control, useForm, UseFormReturn } from "react-hook-form";
import styles from "./index.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SchemaCareerType,
  SchemaSOI,
  SchemaSOIType,
} from "../../../../validations/career";

interface PopoverInputProps {
  label?: string;
  open: boolean;
  setOpen: (arg: boolean) => void;
  parentMethod: UseFormReturn<SchemaCareerType>;
  parentFormName: keyof SchemaCareerType;
  parentFormControl: Control<any>;
}

const PopoverTextInput = ({
  label,
  open,
  setOpen,
  parentMethod,
  parentFormName,
  parentFormControl,
}: PopoverInputProps) => {
  const methods = useForm<SchemaSOIType>({
    resolver: zodResolver(SchemaSOI),
    mode: "onChange",
    defaultValues: {
      appliedTo: [],
      sourceType: "Bird",
      sourceSubType: "Sub-Bird",
      dateObtained: new Date(),
      comments: "",
      serial: "",
    },
  });

  const {
    setValue: setParentValue,
    watch: parentValues,
    formState: parentFormState,
  } = parentMethod;
  const { formState, handleSubmit, control, watch, setValue } = methods;
  const [source, setSource] = React.useState<"create" | "previous">("create");

  const { appliedTo } = watch();

  const { soi } = parentValues();

  const {
    comments: commentsError,
    serial: serialError,
    sourceSubType: sourceSubTypeError,
    sourceType: sourceTypeError,
  } = formState.errors;

  const previousThreeSOI = React.useMemo(
    () =>
      soi
        .sort((a, b) => b.dateObtained.getTime() - a.dateObtained.getTime())
        .slice(0, 3),
    [soi]
  );

  const submitForm = handleSubmit(async (data) => {
    setParentValue("soi", [
      ...soi,
      {
        ...data,
        appliedTo: Array.from(new Set([...appliedTo, parentFormName])),
      },
    ]);
    setOpen(false);
  });

  const applyForm = (index: number) => {
    if (!soi[index].appliedTo.includes(parentFormName)) {
      soi[index].appliedTo.push(parentFormName);
    }
    setParentValue("soi", soi);
    setOpen(false);
  };

  const selectedSOIString = React.useMemo(() => {
    const selectedSOI = soi.filter((item) =>
      item.appliedTo.includes(parentFormName)
    );
    if (selectedSOI.length > 0) {
      return `${selectedSOI[0].sourceType} | ${
        selectedSOI[0].sourceSubType
      } | ${selectedSOI[0].dateObtained.toDateString()}`;
    }
    return "";
  }, [soi]);

  return (
    <div className={styles.popover__flex}>
      <Popover
        withArrow
        shadow="md"
        position="right-start"
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
              error={parentFormState.errors[parentFormName]?.message}
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
            <Select
              label={"Select Source"}
              value={source === "create" ? "Create new" : "Last updated"}
              onChange={(value) =>
                setSource(value === "Create new" ? "create" : "previous")
              }
              className={styles.dropdowns}
              data={["Create new", "Last updated"]}
              disabled={!(soi.length > 0)}
            />
            {source === "previous" ? (
              <div className={styles.previous__updated_container}>
                {previousThreeSOI.map((item, id) => (
                  <div
                    className={styles.previous__updated_col}
                    key={item.toString() + id}
                  >
                    <label className={styles.previous__updated_label}>
                      Date obtained
                    </label>
                    <div className={styles.previous__updated_content}>
                      {item.dateObtained.toLocaleDateString()}
                    </div>
                    <label className={styles.previous__updated_label}>
                      Type
                    </label>
                    <div className={styles.previous__updated_content}>
                      {item.sourceType}
                    </div>
                    <label className={styles.previous__updated_label}>
                      Sub-Type
                    </label>
                    <div className={styles.previous__updated_content}>
                      {item.sourceSubType}
                    </div>
                    <label className={styles.previous__updated_label}>
                      Serial Number
                    </label>
                    <div className={styles.previous__updated_content}>
                      {item.serial}
                    </div>
                    <label className={styles.previous__updated_label}>
                      Additional Comments
                    </label>
                    <div className={styles.previous__updated_content}>
                      {item.comments}
                    </div>
                    <Button size="xs" onClick={() => applyForm(id)}>
                      APPLY
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <Form.Dropdown
                  label={"Type"}
                  className={styles.dropdowns}
                  control={control}
                  name={"sourceType"}
                  data={["Bird", "Cat", "Dog"]}
                  error={sourceTypeError?.message}
                />
                <Form.Dropdown
                  label={"Sub Type"}
                  className={styles.dropdowns}
                  control={control}
                  name={"sourceSubType"}
                  data={["Sub-Bird", "Sub-Cat", "Sub-Dog"]}
                  error={sourceSubTypeError?.message}
                />
                <Form.TextInput
                  label={"Serial"}
                  className={styles.dropdowns}
                  control={control}
                  name={"serial"}
                  error={serialError?.message}
                />
                <Form.TextInput
                  label={"Comment"}
                  className={styles.dropdowns}
                  control={control}
                  name={"comments"}
                  error={commentsError?.message}
                />
                <Button onClick={submitForm}>APPLY</Button>
              </>
            )}
          </Form>
        </Popover.Dropdown>
      </Popover>
      <TextInput
        label={"SOI | DATE"}
        name={"company"}
        className={styles.popover__soi_input}
        value={selectedSOIString}
        onChange={() => {}}
      />
      <ThemeIcon
        size="md"
        variant="gradient"
        gradient={{ from: "indigo", to: "cyan" }}
        className={styles.icon}
        onClick={() => setOpen(true)}
      >
        +
      </ThemeIcon>
    </div>
  );
};

export default PopoverTextInput;
