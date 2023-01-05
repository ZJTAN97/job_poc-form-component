import styled from "@emotion/styled";
import { createStyles } from "@mantine/styles";

export const useStyles = createStyles((theme) => ({
  skillTextInput: {
    width: "400px",
  },
  reference: {
    fontSize: "12px",
    cursor: "pointer",
    height: "36px",
    padding: "0",
    overflow: "hidden",
  },
}));

export const Title = styled("div")(({ disabled }: { disabled?: boolean }) => ({
  fontSize: "18px",
  fontWeight: 600,
  marginLeft: "15px",
  color: disabled ? "rgb(0 0 0 / 30%)" : "black",
}));

export const ArrayContainer = styled("div")(({}) => ({
  padding: "10px 0 10px 0",
  marginTop: "30px",
}));

export const ArrayRow = styled("div")(
  ({ highlight }: { highlight?: boolean }) => ({
    display: "flex",
    padding: "20px 15px",
    gap: "10px",
    borderRadius: "5px",
    backgroundColor: highlight ? "rgb(192 235 249 / 20%)" : "",
  }),
);

export const ButtonRow = styled("div")(() => ({
  display: "flex",
  gap: "10px",
}));

export const ErrorLabel = styled("div")(({ theme }) => ({
  fontSize: theme.spacing.sm,
  color: "red",
  marginLeft: "15px",
}));
