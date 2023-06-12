import styled, { css } from "styled-components";

const Container = styled.div`
  padding-top: 8em;

  min-height: ${(props) => (props.minHeight ? props.minHeight : "100vh")};
  background-color: ${(props) => props.bgColor};
  font-family: ${(props) => props.fontFamily};

  //xs
  @media all and (max-width: 767px) {
    padding: 0em;
    width: 100%;
  }
`;

const Content = styled.div`
  max-width: 80%;
  margin: 0 auto;
  @media all and (max-width: 767px) {
    padding-top: 114px;
    width: 100%;
  }
`;

export { Container, Content };
