import styled from "styled-components";
import theme from "../../styles/theme";
import Button from "../Button";

export const Wrapper = styled.div`
  display: flex;
  align-self: center;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  border-radius: 16px 16px 0 0;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  height: 100%;
`;

export const ItemWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  transition: all 0.3s ease-out;
  border-bottom: ${({ selected }) =>
    selected ? `2px solid ${theme.colors.secondary}` : "2px solid white"};
`;

export const Item = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
`;

export const Separator = styled.div`
  height: 81%;
  width: 1px;
  background-color: ${theme.colors.grey};
`;

export const StyledButton = styled(Button)`
  /* padding: ; */
  padding: 24px 0px;
  width: 100%;
  margin: 0;

  color: ${theme.colors.black};
  font-weight: 500;
  ${({selected}) => selected && `color: ${theme.colors.secondary}; font-weight: 600;`}
`;