import React from "react";
import styles from "./index.module.css";

interface GroupRowProps {
  groupName: string;
  children: React.ReactNode;
}

export const GroupRow = ({ groupName, children }: GroupRowProps) => {
  return (
    <div className={styles.main__container}>
      <div className={styles.container__col}>{groupName}</div>
      <div className={styles.container__col}>{children}</div>
    </div>
  );
};
