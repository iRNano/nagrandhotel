import styled from "styled-components";
import nagrand from "../images/Nagrandcream.png";
export const BrandImg = styled.img.attrs({
  src: nagrand,
})`
  max-width: 150px;
  color: red;
  @media (max-width: 767px) {
    max-width: 80px;
  }
`;

export const StyledNav = styled.div`
  position: fixed;
  top: 0;
  padding: 2em;
  width: 100%;
  background-color: ${({ showBackground, theme }) =>
    showBackground ? theme.colors.pine : "transparent"};
  z-index: 999;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  max-width: 100vw;

  @media (max-width: 767px) {
    padding: 2em;
  }
`;
export const NavUnlisted = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;

  a {
    text-decoration: none;
  }
  li {
    color: ${(props) => props.color};
    margin: 0 0.8rem;
    font-size: 0.8rem;
    position: relative;
    list-style: none;
    text-align: center;
    font-family: ${(props) => props.theme.fontfamily.monsterrat};
  }

  .current {
    li {
      color: ${(props) => props.theme.blush};
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    overflow: hidden;
    max-height: ${({ collapsed }) => (collapsed ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
  }
`;

export const Hamburger = styled.div`
  display: none;
  flex-direction: column;

  span {
    height: 2px;
    width: 40px;
    background: ${(props) => props.theme.cream};
    margin-bottom: 6px;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;
