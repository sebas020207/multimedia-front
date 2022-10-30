import React from "react";

// reactstrap components
// import {
// } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import NosotrosHeader from "components/Headers/nosotrosHeader";
import DarkFooter from "components/Footers/DarkFooter.js";

// sections for this page

import NucleoIcons from "./index-sections/NucleoIcons.js";
import Descripcion_Nosotros from "./index-sections/Descripcion_Nosotros.js";

const Nosotros = (props) => {
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
        <NosotrosHeader />
        <Descripcion_Nosotros />
        <NucleoIcons /> {/* esto contiene todo el cuerpo de nosotros faltal actualziar name */}
        <DarkFooter />
      </div>
    </>
  );
};

export default Nosotros;
