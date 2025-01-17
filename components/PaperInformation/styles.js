import styled from "styled-components";
import { Card, Box, TextField } from "@material-ui/core";

export const StyledCard = styled(Card).attrs({})`
  border-radius: 16px !important;
`;

// export const StyledGridContainer = styled(Grid).attrs({})``;

export const StyledBoxContainer = styled(Box).attrs({
  p: 3,
})``;

export const StyledBoxItem = styled(Box).attrs({
  p: 0,
})``;

export const StyledTextField = styled(TextField).attrs({
  fullWidth: true,
  // margin: "dense",
})``;
