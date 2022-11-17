import { Button, Drawer } from "@mantine/core";
import React from "react";
import { Base } from "../../components/Base";
import { CareerHistoryForm } from "./components/CareerHistoryForm";
import { ReferencePopup } from "./components/CareerHistoryForm/components/ReferencesPopup";
import { useStyles } from "./styles";

export const EmployeeInfo = () => {
  const { classes } = useStyles();

  const [openOption, setOpenOption] = React.useState(false);

  return (
    <Base>
      <Button onClick={() => setOpenOption(true)} className={classes.btn}>
        Click to add Career History
      </Button>
      <Drawer
        withOverlay={false}
        position="right"
        opened={openOption}
        onClose={() => setOpenOption(false)}
        className={classes.drawer}
      >
        <CareerHistoryForm />
      </Drawer>
    </Base>
  );
};

export default EmployeeInfo;
