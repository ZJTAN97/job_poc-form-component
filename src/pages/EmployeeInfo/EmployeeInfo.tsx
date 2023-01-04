import { Button, Drawer } from "@mantine/core";
import React from "react";
import { Base } from "../../components/Base";
import { CareerHistoryForm } from "./components/CareerHistoryForm";
import { useStyles } from "./styles";

export const EmployeeInfo = () => {
  const { classes } = useStyles();
  const [openCreate, setOpenCreate] = React.useState(false);

  return (
    <Base>
      <Drawer
        withOverlay={false}
        position="right"
        opened={openCreate}
        onClose={() => {
          setOpenCreate(false);
        }}
        className={classes.drawer}
      >
        <CareerHistoryForm setDrawer={setOpenCreate} />
      </Drawer>

      <Button onClick={() => setOpenCreate(true)} className={classes.btn}>
        Click to add Career Record
      </Button>
    </Base>
  );
};

export default EmployeeInfo;
