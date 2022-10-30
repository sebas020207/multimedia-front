import React, { useRef } from "react";
import "../assets/css/form.css";

const FormImage = (props) => {
  const imageUrl = props.value ? URL.createObjectURL(props.value) : props.placeholder;
  const fileRef = useRef(null);

  const openFileBrowser = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  return (
    <div className="input">
      <p className="info description">{props.title}</p>
      <img className="preview" src={imageUrl} alt="Profile picture" />
      <p className="description">Vista previa</p>
      <label
        className="input-file"
        onClick={openFileBrowser}
      >
        {props.msg}
      </label>
      <input
        ref={fileRef}
        type="file"
        name={props.name}
        id={props.id}
        onChange={props.onChange}
      />
    </div>
  );
};

export default FormImage;

