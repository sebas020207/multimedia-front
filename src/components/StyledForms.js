import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const colores = {
    borde: "#0075FF",
    error: "#bb2929",
    exito: "#1ed12d"
}

const FormS = styled.form`
    display: grid;
    grid-template-colums: 1fr 1fr;
    gap: 20px;

    @media (max-width: 800px){
        grid-template-colums: 1fr;
    }
`;

const Label = styled.label`
    display: block;
    font-weight: 700;
    padding: 10px;
    min-height: 40px;
    cursor: pointer;

    ${props => props.valido === 'false' && css`
        color: ${colores.error}
    `}
`;

const GInput = styled.div`
    position: relative;
    z-index: 90;
`;

const Input = styled.input`
    width: 100%;
    background: #fff;
    border-radius: 3px;
    height: 45px;
    line-height: 45px;
    padding: 0 40px 0 10px;
    transition: .3s ease all;
    border: 1px solid black;

    &:focus {
        border: 3px solid ${colores.borde};
        outline: none;
        box-shadow: 3px 0px 30px rgba(163,163,163, 0.4);
    }

    ${props => props.valido === 'true' && css`
        border: 1px solid black;
    `}

    ${props => props.valido === 'false' && css`
        border: 3px solid ${colores.error} !important;
    `}
`;

const ErrorMessage = styled.p`
    font-size: 12px;
    margin-bottom: 0;
    color: ${colores.error};
    display: none;

    ${props => props.valido === 'true' && css`
        display: none;
    `}

    ${props => props.valido === 'false' && css`
        display: block;
    `}
`;

const ValidationIcon = styled(FontAwesomeIcon)`
    position: absolute;
    right: 10px;
    bottom: 14px;
    z-index: 100;
    font-size: 16px;
    opacity: 0;

    ${props => props.valido === 'true' && css`
    opacity: 1;
    color: ${colores.exito};
    `}

    ${props => props.valido === 'false' && css`
        opacity: 1;
        color: ${colores.error};
    `}
`;

const ButtonArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-column: span 2;

    @media (max-width: 800px){
        grid-column: span 1;
    }
`;

const Button = styled.button`
    width: 30%;
    background: #000;
    color: #fff;
    font-weight: bold;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: .1s ease all;

    &:hover {
        box-shadow: 3px 0px 30px rgba(163,163,163, 1);
    }
`;

const SuccessMessage = styled.p`
    font-size: 14px;
    color: ${colores.exito};
`;

const FailedMessage = styled.p`
    height: 45px;
    line-height: 45px;
    background: ${colores.error};
    padding: 0px 15px;
    border-radius: 3px;
    grid-column: span 2;
    p {
        margin: 0;
    }
    b {
        margin-left: 10px
    }
`;

export {FormS,
    Label,
    GInput,
    Input,
    ErrorMessage,
    ValidationIcon,
    ButtonArea,
    Button,
    SuccessMessage,
    FailedMessage
};