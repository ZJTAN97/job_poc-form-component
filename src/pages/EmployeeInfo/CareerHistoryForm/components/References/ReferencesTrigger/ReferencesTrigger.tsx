import {
  ReferencesStateMethods,
  useReferenceStateContext,
} from "../References";
import { TriggerRow, useStyles } from "./styles";
import { useFormContext, Path } from "react-hook-form";
import { Button, Checkbox, Textarea } from "@mantine/core";
import { IconCirclePlus } from "@tabler/icons";
import React from "react";
import { CareerType } from "../../../../../../model/Career";

interface ReferencesTriggerProp {
  /** Field Name required to filter which references to show for this component instance */
  field: string;

  /** Disable trigger */
  disabled?: boolean;

  arrId?: number;
}

export const ReferencesTrigger = ({
  field,
  disabled,
  arrId,
}: ReferencesTriggerProp) => {
  const { classes } = useStyles();

  const referenceStateContext = useReferenceStateContext();
  const formContext = useFormContext<CareerType>();

  const { openPanel, setOpenPanel } =
    referenceStateContext as ReferencesStateMethods;

  const handlePanelOpen = () => {};

  return (
    <>
      {openPanel ? (
        <TriggerRow>
          <Textarea
            w={190}
            ml={10}
            label={"References"}
            size="xs"
            readOnly
            classNames={{
              input: classes.reference,
            }}
          />
        </TriggerRow>
      ) : (
        <Button
          leftIcon={<IconCirclePlus />}
          variant="white"
          mt={24}
          ml={50}
          onClick={() => handlePanelOpen()}
        >
          Add references
        </Button>
      )}
    </>
  );
};
