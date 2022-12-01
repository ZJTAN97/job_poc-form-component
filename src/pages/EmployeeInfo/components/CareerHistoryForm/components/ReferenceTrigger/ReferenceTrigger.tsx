import React from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { Button, Textarea } from "@mantine/core";
import { useStyles } from "./styles";
import { IconCirclePlus } from "@tabler/icons";

interface ReferenceTriggerProps<T extends FieldValues> {
  isOpenPopover: boolean;
  name: Path<T>;
  content: string;
  selectedRefOption?: Path<T>;
  setSelectedRefOption: (arg: Path<T>) => void;
  setIsOpenPopover: (arg: boolean) => void;
  setEditMode: (arg: boolean) => void;
  // dont need expose this prop
  disabled?: boolean; // https://react-hook-form.com/api/useform/getfieldstate
}

export const ReferenceTrigger = <T extends FieldValues>({
  isOpenPopover,
  name,
  content,
  selectedRefOption,
  setSelectedRefOption,
  setIsOpenPopover,
  setEditMode,
  disabled,
}: ReferenceTriggerProps<T>) => {
  const { classes } = useStyles();

  const formMethod = useFormContext<T>();

  const referencePopoverTrigger = (selectedRefOption: Path<T>) => {
    setSelectedRefOption(selectedRefOption);
    setIsOpenPopover(true);
    setEditMode(false);
  };

  const existingReference = React.useMemo(() => {
    const filteredReference = formMethod
      .getValues()
      .references.filter(
        (ref: T) => ref.field === name && ref.content === content,
      );
    if (filteredReference.length > 0) {
      const numOfSource = filteredReference[0].sources.length;
      const source = filteredReference[0].sources[0];
      if (numOfSource === 1) {
        return `${source.referenceType}\n${source.dateObtained}`;
      } else if (numOfSource > 1) {
        return `${source.referenceType}\n${source.dateObtained} + ${
          numOfSource - 1
        } more`;
      }
    }
  }, [formMethod.getValues().references]);

  // console.log("-- existing reference --");
  // console.log(existingReference);

  return (
    <>
      {isOpenPopover || existingReference ? (
        <Textarea
          ml={10}
          label={"References"}
          value={existingReference}
          size="xs"
          readOnly
          autoFocus={selectedRefOption === name}
          onClick={() => referencePopoverTrigger(name)}
          classNames={{
            input: classes.reference,
          }}
          disabled={isOpenPopover && selectedRefOption !== name}
        />
      ) : (
        <Button
          leftIcon={<IconCirclePlus />}
          variant={"white"}
          mt={24}
          onClick={() => referencePopoverTrigger(name)}
          disabled={disabled}
        >
          References
        </Button>
      )}
    </>
  );
};
