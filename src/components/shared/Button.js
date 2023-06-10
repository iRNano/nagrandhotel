import styled from "styled-components";

const Button = styled.button`
  --bgColor: Transparent;
  appearance: none;
  background-color: var(--bgColor);
  padding: 0.75em 1.5em;
  transition: background-color 0.25s, color 0.25s;
  border: 0.05em solid ${(props) => props.theme.colors.pine};
  font-family: Montserrat;
  color: ${(props) => props.theme.colors.pine};
  letter-spacing: 0.1em;

  &:hover {
    ${(props) => {
      switch (props.location) {
        case "landing":
          return `color: ${props.theme.pine};`;
        case "aboutus":
          return `color: ${props.theme.pine};`;
        case "profile":
          return `color: ${props.theme.pine};`;
        case "booking":
          return `color: ${props.theme.pine};`;
      }
      return "color: white;";
    }}
    background-color: ${(props) => props.theme.blush};
    border: 0.05em solid trasparent;
    cursor: pointer;
  }

  ${(props) => {
    switch (props.location) {
      case "landing":
        return `--bgColor: ${props.theme.colors.blush}; border: none; font-weight:600;`;
    }
    return `color: ${props.theme.colors.pine};`;
  }}

  ${(props) => {
    switch (props.size) {
      case "small":
        return "font-size: 0.75rem;";
      case "large":
        return "font-size: 1.25rem;";
    }

    return "font-size: 1rem;";
  }}
`;

export default Button;
