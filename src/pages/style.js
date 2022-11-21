import styled, {css} from 'styled-components'

const Wrapper = styled.div`
  display: ${(props) => props.display ? props.display : "block"};;
  padding: 8em;
  flex-flow: row nowrap;
  min-height: ${(props) => props.minHeight ? props.minHeight : "100vh"};
  background-color: ${(props) => props.bgColor};
  font-family: ${(props) => props.fontFamily};
  //xs
  @media all and (max-width: 767px) {
    padding: 0em;
  }
`;

const Content = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0 auto;
  max-width: 1920px;
  height: auto;
  display: block;
  justify-content: center;
  width: ${(props) => props.width ? props.width : "70%"};
  background-color: ${(props) => props.bgColor};
  font-family: ${(props) => props.fontFamily};
  font-size: ${(props) => props.fontSize};;
  color: ${(props) => props.color};
  @media all and (max-width: 767px) {
    padding-top: 114px;
    width: 100%;
  }
`;

export {Wrapper, Content}