import { Button, Drawer } from "@mantine/core";
import React from "react";
import { getAllCareers } from "../../api/career";
import { Base } from "../../components/Base";
import { CareerHistoryForm } from "./components/CareerHistoryForm";
import { useStyles } from "./styles";

export const EmployeeInfo = () => {
  const { classes } = useStyles();

  const [openOption, setOpenOption] = React.useState(false);

  React.useEffect(() => {
    const data = getAllCareers();
    console.log(data);
  }, []);

  return (
    <Base>
      <Button onClick={() => setOpenOption(true)} className={classes.btn}>
        Click to add Career History Stepper
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
