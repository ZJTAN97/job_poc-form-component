import styled from "@emotion/styled";
import {
  Box,
  BoxProps,
  createPolymorphicComponent,
  Group,
  GroupProps,
} from "@mantine/core";
import { createStyles } from "@mantine/styles";

export const useStyles = createStyles(() => ({
  stepperStyles: {
    width: "65%",
    padding: "10px 40px",
  },

  stepLabel: {
    fontSize: "12px",
  },
  stepBody: {
    marginTop: "30px",
    backgroundColor: "#efefef",
    padding: "20px",
    borderRadius: "5px",
  },
  nextBtn: {
    marginTop: "10px",
  },
}));

const _ButtonGroup = styled(Group)(() => ({
  width: "65%",
}));

export const ButtonGroup = createPolymorphicComponent<"div", GroupProps>(
  _ButtonGroup,
);

const _DrawerHeader = styled(Box)(() => ({
  color: "#3f3f3f",
  fontSize: "20px",
  padding: "5px",
}));

export const DrawerHeader = createPolymorphicComponent<"div", BoxProps>(
  _DrawerHeader,
);
