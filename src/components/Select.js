import React from "react";
import "../assets/css/select.css";

const Select = (props) => {
  return (
    <select
      id={props.id}
      name={props.name}
      onChange={props.onChange}
      value={props.value || ""}
    >
      {props.options.map((op, index) => (
        <option key={index} value={op.value}>
          {op.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
