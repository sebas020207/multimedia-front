import React from "react";
import "../assets/css/form.css";

const FormSubmitSection = (props) => {
    return (
        <section className="submit">
            { props.children }
        </section>
    );
}

export default FormSubmitSection;