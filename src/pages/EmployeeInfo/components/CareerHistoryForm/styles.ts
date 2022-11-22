import styled from "@emotion/styled";
import { createPolymorphicComponent, Grid, GridProps } from "@mantine/core";
import { createStyles } from "@mantine/styles";

export const useStyles = createStyles(() => ({
  textInput: {
    margin: "0 0 35px 0",
  },
}));

export const SkillLabel = styled("div")(({ theme }) => ({
  display: "flex",
  marginTop: theme.spacing.xs,
  paddingBottom: theme.spacing.xs,
  fontSize: theme.fontSizes.sm,
}));

export const ErrorLabel = styled("div")(({ theme }) => ({
  fontSize: theme.spacing.sm,
  color: "red",
  margin: `${theme.spacing.sm} 0`,
}));

const _GridRow = styled(Grid)(({}) => ({
  margin: `40px 0`,
}));

export const GridRow = createPolymorphicComponent<"div", GridProps>(_GridRow);
