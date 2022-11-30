import styled from "@emotion/styled";
import { createStyles } from "@mantine/styles";

export const useStyles = createStyles(() => ({
  formTextInput: {
    width: "400px",
    marginBottom: "10px",
  },
  reference: {
    fontSize: "12px",
    cursor: "pointer",
    height: "36px",
    padding: "0",
    overflow: "hidden",
  },
}));

export const MainContainer = styled("div")(({}) => ({
  padding: "10px 0 10px 0",
}));

export const Label = styled("div")(({}) => ({
  fontWeight: 600,
  marginBottom: "20px",
}));

export const Row = styled("div")(({}) => ({
  display: "flex",
  gap: "10px",
}));
