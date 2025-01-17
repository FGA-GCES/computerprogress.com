import styled from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  h2 {
    font-size: 1.6rem !important;
    font-weight: 500 !important;
    align-self: bottom;
    margin-top: 75px;
    margin-bottom: 50px;

  }
`;

export const ItemsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  margin: 0 auto;
  grid-gap: 50px 100px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  text-transform: uppercase;
  font-size: 12px;
`;