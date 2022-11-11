import { Button, Drawer } from "@mantine/core";
import React from "react";
import { Base } from "../../components/Base";
import { AddCareerHistory } from "./AddCareerHistory";
import styles from "./index.module.css";

export const EmployeeInfo = () => {
  const [opened, setOpened] = React.useState(false);

  return (
    <Base>
      <div>
        <Button onClick={() => setOpened(true)}>
          Click to add Career History
        </Button>
      </div>
      <Drawer
        withOverlay={false}
        position="right"
        opened={opened}
        onClose={() => setOpened(false)}
        className={styles.drawer__container}
      >
        <AddCareerHistory />
      </Drawer>
    </Base>
  );
};

export default EmployeeInfo;
