import React from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { Button, Textarea } from "@mantine/core";
import { useStyles } from "./styles";
import { IconCirclePlus } from "@tabler/icons";

interface ReferenceTriggerProps<T extends FieldValues> {
  isOpenPopover: boolean;

  /** Field Name required to filter which references to show for this component instance */
  name: Path<T>;

  /** Content required to filter which references to show for this component instance */
  content: string;

  /** Currently selected field to show references on the popup component */
  currentName: Path<T>;

  /** Set selected field to show references on the popup component */
  setCurrentName: (arg: Path<T>) => void;

  currentContent: string;

  setCurrentContent: (arg: string) => void;

  setIsOpenPopover: (arg: boolean) => void;

  setEditMode: (arg: boolean) => void;

  disabled?: boolean;
}

export const ReferenceTrigger = <T extends FieldValues>({
  isOpenPopover,
  name,
  content,
  currentName,
  setCurrentName,
  currentContent,
  setCurrentContent,
  setIsOpenPopover,
  setEditMode,
  disabled,
}: ReferenceTriggerProps<T>) => {
  const { classes } = useStyles();

  const formMethod = useFormContext<T>();

  const referencePopoverTrigger = (name: Path<T>, content: string) => {
    setCurrentName(name);
    setCurrentContent(content);
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
    return "";
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
          autoFocus={currentName === name && currentContent === content}
          onClick={() => referencePopoverTrigger(name, content)}
          classNames={{
            input: classes.reference,
          }}
          disabled={
            isOpenPopover && currentName !== name && currentContent !== content
          }
        />
      ) : (
        <Button
          leftIcon={<IconCirclePlus />}
          variant={"white"}
          mt={24}
          onClick={() => referencePopoverTrigger(name, content)}
          disabled={disabled}
        >
          References
        </Button>
      )}
    </>
  );
};
