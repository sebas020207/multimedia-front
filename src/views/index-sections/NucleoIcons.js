import React from "react";
// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";
import msv from "../../assets/img/msv.png";
import { padding } from "@mui/system";

// core components

function NucleoIcons() {
  return (
    <>
      <div className="section section-nucleo-icons">
        <Container>
          <Row>
            <Col lg="6" md="12">
              <h2 className="title" style={{textAlign: "left"}}>Misión</h2>
              <hr></hr>
              <h5 className="description">
                Proporcionar en tiempo y forma los mejores productos que
                garanticen la mejor producción en la industria del Vidrio en
                México, América y el Mundo
              </h5>
            </Col>
            <Col lg="6" md="12">
              <h2 className="title">Visión</h2>
              <hr></hr>
              <h5 className="description">
                Ser la empresa líder en México en brindar las mejores soluciones
                y los mejores productos para la industria del Vidrio, contando
                con el apoyo de los mejores socios comerciales del Mundo
              </h5>
            </Col>
            <Col lg="6" md="12">
              <h2 className="title">Valores</h2>
              <hr></hr>
              <h5 className="description">
                <ul>
                  <li>Alta calidad</li>
                  <li>Prestigio</li>
                  <li>Excelencia</li>
                  <li>Responsabilidad social empresarial</li>
                  <li>Creatividad e innovación</li>
                  <li>Trabajo en equipo</li>
                  <li>Identidad</li>
                  <li>Profesionalismo</li>
                  <li>Pasión: comprometidos con el alma y la mente</li>
                </ul>
              </h5>
            </Col>
            <Col lg="6" md="12">
              <img
                alt="..."
                height={"75%"}
                className="n-logo"
                src={msv}
              ></img>
            </Col>
          </Row>
          <Row></Row>
          <Row></Row>
        </Container>
      </div>
    </>
  );
}

export default NucleoIcons;
