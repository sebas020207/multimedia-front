/*eslint-disable*/
import React from "react";
import logo from "../../assets/img/IEDX_LOGO-WITHOUTFONT.png";
// reactstrap components
import { Container } from "reactstrap";

function DarkFooter() {
  return (
    <footer className="footer" data-background-color="black">
      <Container>
        <nav style={{ paddingTop: "2%", float: "right" }}>
          <a
            style={{ float: "right" }}
            target="_blank"
          >
            Aviso de privacidad
          </a>
        </nav>
        <nav style={{ paddingTop: "2%", float: "left" }}>
          <img alt="..." src={logo} width="100px"></img>
        </nav>
       
      </Container>
    </footer>
  );
}

export default DarkFooter;
