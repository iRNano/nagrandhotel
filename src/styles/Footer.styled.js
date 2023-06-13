import styled from "styled-components";
import nagrand from "../images/Nagrandcream.png";

export const FooterStyle = styled.div`
  background-color: ${(props) => props.theme.pine};
  color: ${(props) => props.theme.cream};
`;

export const FooterContent = styled.div`
  width: 70%;
  margin: 0 auto;
  padding-top: 5%;
  color: ${(props) => props.theme.cream};
  //xs

  .align {
    text-align: right;
  }
  @media all and (max-width: 767px) {
    width: 100%;
    font-size: 0.7rem;

    .align {
      text-align: center;
    }
  }
`;

export const FooterLinks = styled.p`
  color: ${(props) => props.theme.cream};
`;

export const BrandImg = styled.img.attrs({
  src: nagrand,
})`
  max-width: 200px;
  height: auto;
`;
