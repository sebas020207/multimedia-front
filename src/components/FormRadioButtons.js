import React from "react";
import "../assets/css/form.css";

const FormRadioButtons = (props) => {
    return (
        <div className="input">
            {props.icon ? <i className={"fas "+props.icon}></i> : <></>}
            <label>{props.title}</label>
            {props.op.map((o) => {return <div
                style={{display: "inline-block"}}
                key={o.id}
            >
                <input
                    type="radio"
                    name={props.name}
                    id={o.id}
                    value={o.value}
                    checked={o.checked}
                    onChange={props.onChange}
                    required={props.required}
                />
                <label className="radio" htmlFor={o.id}>{o.title}</label>
            </div>})}
        </div>
    );
};

export default FormRadioButtons;