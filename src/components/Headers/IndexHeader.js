/*eslint-disable*/
import React from "react";
import logo  from "../../assets/img/IEDX_LOGO-WITHOUTFONT.png";

// reactstrap components
import { Container } from "reactstrap";
// core components

function IndexHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("../../assets/img/templado.jpg") + ")",
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div  className="content-center brand">
            <img
              alt="..."
              src={logo}
              width="400px"
            ></img>
            <h1 className="h1-seo">Industria del vidrio</h1>
            <h3>Maquiria y Equipo Variable</h3>
          </div>
        </Container>
      </div>
    </>
  );
}

export default IndexHeader;
