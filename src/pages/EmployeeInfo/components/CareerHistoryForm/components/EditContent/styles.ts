import styled from "@emotion/styled";
import {
  Box,
  BoxProps,
  createPolymorphicComponent,
  Grid,
  GridProps,
} from "@mantine/core";
import { createStyles } from "@mantine/styles";

export const useStyles = createStyles(() => ({
  textInput: {
    margin: "0 0 35px 0",
  },
}));

const _SkillLabel = styled(Box)(({ theme }) => ({
  display: "flex",
  marginBottom: `"0 0 15px 0"`,
  fontSize: "12px",
}));

export const SkillLabel = createPolymorphicComponent<"div", BoxProps>(
  _SkillLabel,
);

const _ErrorLabel = styled("div")(() => ({
  fontSize: "12px",
  color: "red",
  margin: "15px 0",
}));

export const ErrorLabel = createPolymorphicComponent<"div", BoxProps>(
  _ErrorLabel,
);

const _GridRow = styled(Grid)(() => ({
  margin: "40px 0",
}));

export const GridRow = createPolymorphicComponent<"div", GridProps>(_GridRow);
