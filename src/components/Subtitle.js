import React from "react";

const Subtitle = (props) => {
  return (
    <p style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
      <h3>{props.children}</h3>
    </p>
  );
};

export default Subtitle;
