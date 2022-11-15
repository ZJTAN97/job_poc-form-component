import { Button, Drawer } from "@mantine/core";
import React from "react";
import { Base } from "../../components/Base";
import { CareerHistoryForm } from "./components/CareerHistoryForm";
import styles from "./index.module.css";

export const EmployeeInfo = () => {
  const [openOption1, setOpenOption1] = React.useState(false);
  const [openOption2, setOpenOption2] = React.useState(false);

  return (
    <Base>
      <Button onClick={() => setOpenOption1(true)} className={styles.btn}>
        Click to add Career History 1
      </Button>
      <Drawer
        withOverlay={false}
        position="right"
        opened={openOption1}
        onClose={() => setOpenOption1(false)}
        className={styles.drawer__container}
      >
        <CareerHistoryForm />
      </Drawer>

      <Button onClick={() => setOpenOption2(true)} className={styles.btn}>
        Click to add Career History 2
      </Button>
      <Drawer
        withOverlay={false}
        position="right"
        opened={openOption2}
        onClose={() => setOpenOption2(false)}
        className={styles.drawer__container}
      >
        <div>Option 2</div>
      </Drawer>
    </Base>
  );
};

export default EmployeeInfo;
