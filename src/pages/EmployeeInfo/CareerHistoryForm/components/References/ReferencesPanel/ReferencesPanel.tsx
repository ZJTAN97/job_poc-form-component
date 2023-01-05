import React from "react";
import { useReferenceStateContext } from "../References";
import {
  ButtonRow,
  ReferenceCard,
  ReferenceCardRow,
  Title,
  TitleContainer,
  useStyles,
} from "./styles";
import { Button, Popover } from "@mantine/core";
import {
  IconArrowLeft,
  IconCirclePlus,
  IconEdit,
  IconIdOff,
} from "@tabler/icons";

import { Path, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const ReferencesPanel = () => {
  const { classes } = useStyles();

  const referenceStateContext = useReferenceStateContext();
  const { setOpenPanel } = referenceStateContext!;

  const [showCommentsInput, setShowCommentsInput] = React.useState(false);

  return (
    <Popover.Dropdown p={30}>
      <TitleContainer>
        <Title>References</Title>
        <IconCirclePlus
          size={20}
          style={{ cursor: "pointer" }}
          className={classes.addIconBtn}
        />
      </TitleContainer>

      <ButtonRow>
        <Button
          classNames={{
            root: classes.applyBtn,
          }}
          size={"xs"}
          variant="outline"
        >
          Apply
        </Button>
      </ButtonRow>

      <Button
        classNames={{
          root: classes.returnBtn,
        }}
        mt={50}
        variant={"subtle"}
        leftIcon={<IconArrowLeft />}
      >
        Confirm and close panel
      </Button>
    </Popover.Dropdown>
  );
};
