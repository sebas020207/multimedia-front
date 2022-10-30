import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../assets/css/bread_crumb.css";

const BreadCrum = ({ links = [] }) => {

  return (
    <div className="breadcrum">
      {links.map((link, index) => (
        <Fragment key={index}>
          <Link to={link.path}>{link.name}</Link> &gt; 
        </Fragment>
      ))}
    </div>
  );
};

export default BreadCrum;
