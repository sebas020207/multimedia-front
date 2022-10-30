import React from "react";
import "../assets/css/form.css";

const FormTelephone = (props) => {
    return (
        <div className="input">
            {props.icon ? <i className={"fas "+props.icon}></i> : <></>}
            <label htmlFor={props.name}>{props.title}</label>
            <input
                type="tel"
                name={props.name}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                required={props.required}
            />
        </div>
    );
};

export default FormTelephone;