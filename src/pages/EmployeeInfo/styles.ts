import styled from "@emotion/styled";
import { createStyles } from "@mantine/styles";

export const useStyles = createStyles(() => ({
  drawer: {
    top: "60px !important",
    width: "calc(100% - 200px) !important",
  },
  drawerContent: {
    top: "60px !important",
    width: "45% !important",
    overflowY: "auto",
  },
  btn: {
    marginRight: "30px",
  },
  tableRow: {
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#e4ecf5",
    },
  },
}));
