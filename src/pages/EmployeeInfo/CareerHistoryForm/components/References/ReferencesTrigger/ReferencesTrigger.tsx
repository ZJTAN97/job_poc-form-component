import {
  ReferencesStateMethods,
  useReferenceStateContext,
} from "../References";
import { TriggerRow, useStyles } from "./styles";
import { useFormContext, Path } from "react-hook-form";
import { Button, Textarea } from "@mantine/core";
import { IconCirclePlus } from "@tabler/icons";
import { CareerType } from "../../../../../../model/Career";

interface ReferencesTriggerProp {
  /** Field Name required to filter which references to show for this component instance */
  field: Path<CareerType>;

  /** Disable trigger */
  disabled?: boolean;

  arrayId?: number;
}

export const ReferencesTrigger = ({
  field,
  disabled,
  arrayId,
}: ReferencesTriggerProp) => {
  const { classes } = useStyles();

  const referenceStateContext = useReferenceStateContext();
  const { openPanel, setOpenPanel, setCurrentField, setCurrentArrayId } =
    referenceStateContext as ReferencesStateMethods;

  const handlePanelOpen = () => {
    setOpenPanel(true);
    setCurrentField(field);
    setCurrentArrayId(arrayId);
  };

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
