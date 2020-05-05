import {rem} from 'polished'
import styled, {css} from 'styled-components'

const baseStyles = css`
    ${props => {
        switch(props.location){
            case'rooms':
                return `color: ${props.theme.pine};`
            case'booking':
                return `color: ${props.theme.pine};`
            case'checkout':
                return `color: ${props.theme.pine};`
            case'profile':
                return `color: ${props.theme.pine};`
            case'admin':
                return `color: ${props.theme.pine};`
        }
        return "color:white;"
    }}
    line-height: 1.2;
`;
const H1 = styled.h1`
    ${baseStyles}
    font-size: ${rem(33)};
`;

const H2 = styled.h2`
    ${baseStyles};
    font-size: ${rem(28)};
`;

const H3 = styled.h3`
    ${baseStyles};
    font-size: ${rem(23)};
`;

const H4 = styled.h4`
    ${baseStyles};
    font-size: ${rem(19)};
`;

const Heading = {
    H1,
    H2,
    H3,
    H4,
};

export default Heading