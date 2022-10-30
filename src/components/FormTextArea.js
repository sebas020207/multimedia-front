import React from "react";
import "../assets/css/form.css";

const FormTextArea = (props) => {
  return (
    <div className="input">
      {props.icon ? <i className={"fas " + props.icon}></i> : <></>}
      <label htmlFor={props.name}>{props.title}</label>
      <textarea
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        rows={props.rows}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
      />
    </div>
  );
};

export default FormTextArea;

