import React from "react";
import {
  FieldValues,
  Path,
  useFormContext,
} from "react-hook-form";
import { Button, Textarea } from "@mantine/core";
import { useStyles } from "./styles";
import { IconCirclePlus } from "@tabler/icons";

interface ReferenceTriggerProps<T extends FieldValues> {
  isOpenPopover: boolean;
  name: Path<T>;
  selectedRefOption?: Path<T>;
  setSelectedRefOption: (arg: Path<T>) => void;
  setIsOpenPopover: (arg: boolean) => void;
  setEditMode: (arg: boolean) => void;
  disabled?: boolean;
}

export const ReferenceTrigger = <T extends FieldValues>({
  isOpenPopover,
  name,
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
      .references.filter((ref: T) => ref.field === name);

    if (filteredReference.length > 0) {
      if (filteredReference[0].sources.length > 0) {
        const source = filteredReference[0].sources[0];
        return `${source.referenceType}\n${source.dateObtained}`;
      }
    }
  }, [formMethod.getValues().references]);

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
