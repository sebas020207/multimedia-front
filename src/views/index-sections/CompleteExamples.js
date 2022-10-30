import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components

function CompleteExamples() {
  return (
    <>
      <div className="section">
        <Container className="text-center">
          <Row className="justify-content-md-center">
            <Col lg="8" md="12">
              <h2 className="title">IEDX MÉXICO </h2>
              <h5 className="description" style={{ color: "black" }}>
                <br></br>
                Es una empresa 100% mexicana, dedicada a ofrecer soluciones de
                tecnología e ingeniería especializada. Fundamentalmente enfocada
                a la industria del vidrio, pero con participación en
                diferentes industrias.​
              </h5>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default CompleteExamples;
