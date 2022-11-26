import styled from 'styled-components'
import landingPageImage from "../../images/home2189.png";
import landingPageImageMobile from "../../images/home1095.png";
import arenaSuite from "../../images/arenasuite1166.png";

const LandingPage = styled.div`
  
  display: flex;
  position: relative;
  min-height: 100vh;
  background-color: ${(props) => props.theme.pine};
  //xs
  // @media all and (max-width: 767px) {
  //   padding: 1em;
  // }
`;

const LandingPageContent = styled.div`
  
  
  position: relative;
  margin: 13em auto 10em auto;
  width: 70%;
  background:url(${landingPageImage});
  background-size:contain;
  background-repeat: no-repeat;
  background-position: center;
  
  
  font-family: ${(props) => props.theme.zcoolXiaoWei};
  @media (max-width: 768px){
    margin: 0 0 10em 0;
    width: 100%;
    background-size: cover;
  }
`;

const LandingHeading = styled.h2`
  font-size: clamp(3rem, 1rem + 10vw, 7rem);
  color: white;
  line-height: clamp(2rem, 1rem + 10vw, 5rem);
  @media all and (max-width: 767px) {
    line-height: 4.5rem;
  }
`;

const FloatingText = styled.div`
    position: absolute;
    transform: translate(0%, 100%);
    margin: 0 auto;

    @media (min-width: 769px and max-width: 992px ){
      transform: translate(-20%, 30%);
    }

    @media (min-width: 993px and max-width: 1140px){
      transform: translate(-10%, 40%);
    margin: 0 auto;
    }
    button{
      margin-top: 10%;
      
    }
    
`;
const AboutUs = styled.div`
  display: flex;
  flex-flow: row nowrap;
  min-height: 100vh;
  padding: 8em;
  background-color: ${(props) => props.theme.cream};
  font-family: ${(props) => props.theme.zcoolXiaoWei};
  //xs
  @media all and (max-width: 767px) {
    padding: 0em;
  }
`;

const AboutUsContent = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 75%;
  margin: 0 auto;

  height: auto;
  display: block;
  justify-content: center;
  color: ${(props) => props.theme.pine};
  @media all and (min-width: 1200px) max-width: 1920px;
  //xs
  @media all and (max-width: 767px) {
    width: 100%;
  }
`;

const SpecialOffer = styled.div`
  display: block;
  flex-flow: row nowrap;
  //   min-height: 100vh;
  background-color: ${(props) => props.theme.blush};
  font-family: ${(props) => props.theme.zcoolXiaoWei};
`;

const SpecialOfferContent = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  max-width: 1920px;
  // height:auto;
  // display:block;
  // justify-content: center;
  color: ${(props) => props.theme.pine};
`;

export { LandingPage, LandingPageContent,  LandingHeading, FloatingText, AboutUs, AboutUsContent, SpecialOffer, SpecialOfferContent}