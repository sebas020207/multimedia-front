import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components

function Images() {
  return (
    <>
      <div className="section section-images">
        <Container>
          <Row>
            <Col md="12">
              <div className="hero-images-container">
                <img
                  alt="..."
                  src="https://drive.google.com/uc?export=view&id=1mqKPRixqlKNezpJbIcWNJUbhWicQPMf3&confirm=t"
                ></img>
              </div>
              <div className="hero-images-container-1">
                <img
                  alt="..."
                  src="https://drive.google.com/uc?export=view&id=11PkNJxGS0YJVgwBpdnPxUzEiD2OOpziF&confirm=t"
                ></img>
              </div>
              <div className="hero-images-container-2">
                <img
                  alt="..."
                  src="https://drive.google.com/uc?export=view&id=17pPmvPRyz6mhBz4aRk1_2jDdB40879dX&confirm=t"
                ></img>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Images;
