import React from "react";
import "../assets/css/form.css";

const FormSelect = (props) => {
  return (
    <div className="input">
      {props.icon ? <i className={"fas " + props.icon}></i> : <></>}
      <label htmlFor={props.name}>{props.title}</label>
      <select
        name={props.name}
        id={props.id}
        required={props.required}
        value={props.value}
        onChange={props.onChange}
      >
        {props.op.map((o) => {
          return (
            <option value={o.value} key={o.value}>
              {o.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;

