import React from 'react';
import { Label, GInput, Input, ErrorMessage, ValidationIcon } from '../components/StyledForms';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const FormInput = ({state, changeState, label, type, placeholder, name, errorMessage, regularExpression, funcion}) => {
    const onChange = (e) => {
        changeState({...state, campo: e.target.value});
    }

    const validation = () => {
        if(regularExpression){
            if(state.campo !== ''){
                if(regularExpression.test(state.campo)){
                    changeState({...state, valido: 'true'});
                }else{
                    changeState({...state, valido: 'false'});
                }
            }else{
                changeState({...state, valido: null});
            }
        }
        if(funcion){
            funcion();
        }
    }

    return(
        <div>
            <Label htmlFor={name} valido={state.valido}>{label}</Label>
            <GInput>
                <Input
                    type={type}
                    placeholder={placeholder}
                    id={name}
                    value={state.campo}
                    onChange={onChange}
                    onKeyUp={validation}
                    onBlur={validation}
                    valido={state.valido}
                />
                <ValidationIcon
                    icon={state.valido === 'true' ? faCheckCircle : faTimesCircle}
                    valido={state.valido}
                />
            </GInput>
            <ErrorMessage valido={state.valido}>{errorMessage}</ErrorMessage>
        </div>
    );
}

export default FormInput;