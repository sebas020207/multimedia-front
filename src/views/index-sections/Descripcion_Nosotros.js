import React from "react";
import ReactPlayer from "react-player/youtube";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components

function Descripcion_Nosotros() {
  return (
    <>
      <div className="section">
        <Container className="text-center">
          <Row className="justify-content-md-center">
            <Col lg="8" md="12">
              <h2 className="title">SOBRE IEDX MÉXICO</h2>
              <h5
                className="description"
                style={{ color: "black", fontSize: "1.3rem" }}
              >
                EDX México, nace en el año 2017 en la Ciudad de México, con el
                propósito de poder apoyar a los diversos sectores industriales
                mexicanos en el proceso de obtención de bienes y refacciones
                para los distintos tipos de producción manufacturera.
                <br></br>
                <br></br>
                En el año 2019, sus fundadores lograron identificar necesidades
                específicas en la Industria del Vidrio, siendo éste un sector
                nuevo y ahora principal rubro a atender. EDX México
                Internacional, durante este año, logro enfocar su prioridad en
                la satisfacción de las necesidades de tecnología e ingeniería
                tan particulares en el sector del Vidrio cuya demanda lo
                presenta, obteniendo para nuestros clientes las mejores
                alternativas, tecnología y equipos disponibles en el mercado
                global.
              </h5>
              <br></br>
              <br></br>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <ReactPlayer url="https://www.youtube.com/watch?v=jitQMC92qQs" />
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Descripcion_Nosotros;
