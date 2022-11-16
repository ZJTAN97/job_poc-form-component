import styled from "@emotion/styled";
import { Box, BoxProps, createPolymorphicComponent } from "@mantine/core";
import { createStyles } from "@mantine/styles";

export const useStyles = createStyles(() => ({
  groupLabel: {
    margin: "40px 0",
  },
  header: {
    color: "#3f3f3f",
    fontSize: "20px",
    padding: "5px",
  },
  textInput: {
    margin: "0 0 30px 0",
  },
  skillItem: {
    paddingTop: "2px",
    color: "#3f3f3f",
    fontSize: "14px",
    marginBottom: "15px",
  },
}));