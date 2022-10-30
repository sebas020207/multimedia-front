import React from "react";
import "../assets/css/form.css";

const FormRightSection = (props) => {
    return (
        <section className="form-right">
            { props.children }
        </section>
    );
}

export default FormRightSection;