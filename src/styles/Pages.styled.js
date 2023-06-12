import styled, { css } from "styled-components";

const Container = styled.div`
  padding: 2em;
  min-height: ${(props) => (props.minHeight ? props.minHeight : "100vh")};
  background-color: ${(props) => props.theme.colors[props.bgColor]};
  font-family: ${(props) => props.fontFamily};
  width: 100%;
  //xs
  @media all and (max-width: 767px) {
    padding: 0em;
    width: 100%;
  }
`;

const Content = styled.div`
  max-width: 80%;
  margin: 0 auto;
  padding: 2em;
  @media all and (max-width: 767px) {
    padding-top: 114px;
    width: 100%;
    max-width: 90%;
  }
`;

export { Container, Content };
