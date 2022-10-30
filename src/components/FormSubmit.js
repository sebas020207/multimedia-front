import React from "react";
import "../assets/css/form.css";

const FormSubmit = (props) => {
    return (
        <div className="input">
          <input
            className="submit"
            type="submit"
            name={props.name}
            id={props.id}
            value={props.value}
          />
        </div>
    );
};

export default FormSubmit;