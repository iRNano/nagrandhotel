import styled from "styled-components"

const Button = styled.button`
    appearance: none;
    background-color: Transparent;
    adding: 0.25em 0.5em;
    transition: background-color 0.25s, color 0.25s;

    &:hover {
        ${props => {
            switch(props.location){
                case 'landing': 
                    return `color: ${props.theme.pine};`;
                case 'aboutus':
                    return `color: ${props.theme.pine};`;
                case 'profile':
                    return `color: ${props.theme.pine};`;
                case 'booking':
                    return `color: ${props.theme.pine};`;
            }
            return (
                "color: white;"
            )
        }}
        background-color: ${props=>props.theme.blush};
        border: none
        cursor: pointer;
    };
    

    ${props => {
        switch(props.location){
            case 'landing': 
                return "color: white;";
            case 'aboutus':
                return `color: ${props.theme.pine};`;
            case 'profile':
                return `color: ${props.theme.pine};`;
            case 'booking':
                return `color: ${props.theme.pine};`;
            case 'admin':
                    return `color: ${props.theme.pine};`;
        }
        return (
            "color: white;"
        )
    }}

    ${props => {
        
        switch(props.size){
            case 'small': 
                return "font-size: 12px;";
            case 'large':
                return "font-size: 20px;";
        }

        return "font-size: 16px;";
    }}

`;

export default Button