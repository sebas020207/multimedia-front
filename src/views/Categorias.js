import React from "react";

// reactstrap components
// import {
// } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import CategoriasHeader from "components/Headers/CategoriasHeader.js";
import DarkFooter from "components/Footers/DarkFooter.js";


import Carouselcat from "./index-sections/Carouselcat";
import Categorytabs from "./index-sections/Categorytabs.js";


const Categorias = (props) => {
  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <CategoriasHeader />
        <Categorytabs />
        <Carouselcat />
        <DarkFooter />
      </div>
    </>
  );
};

export default Categorias;
