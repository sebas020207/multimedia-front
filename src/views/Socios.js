import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/partners-styles.css";

// reactstrap components
// import {
// } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import DarkFooter from "components/Footers/DarkFooter.js";
import SociosHeader from "components/Headers/SociosHeader";

//imagenes
import mapline from "../assets/img/map-line.png";
import MAVSA from "../assets/img/MAVSA.png";
import MenE from "../assets/img/MenE.png";
import logocircle from "../assets/img/EDX.png";



const Socios = (props) => {
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
        <SociosHeader />
        <main className="main">
          <div className="map-container">
            <div className="display-flexible position-relative">
              <img
                src={mapline}
                alt="Mapa del mundo trazado en contorno"
                className="map-line"
              />
              <Link to="/">
                <img
                  src={logocircle}
                  alt="Logotipo miniatura de EDX"
                  className="mini-edx mini-logo"
                />
              </Link>
              <Link
                onClick={() => {
                  window.location.href = "http://www.mavsa.com.ar/";
                }}
              >
                <img
                  src={MAVSA}
                  alt="Logotipo miniatura de MAVSA"
                  className="mini-mavsa mini-logo"
                />
              </Link>
              <Link
                onClick={() => {
                  window.location.href = "http://www.mavsa.com.ar/";
                }}
              >
                <img
                  src={MenE}
                  alt="Logotipo miniatura de MenE"
                  className="mini-mene mini-logo"
                />
              </Link>
            </div>
          </div>
          <div className="partners display-flexible">
            <div>
              <div className="partners-container title-container">
                <h1>Socios Internacionales</h1>
              </div>
              <div className="partners-container mavsa-container">
                <Link
                  onClick={() => {
                    window.location.href = "http://www.mavsa.com.ar/";
                  }}
                >
                  <img
                    src={MAVSA}
                    alt="Logotipo de MAVSA"
                    className="img-container"
                  />
                </Link>
                <div className="info-mavsa">
                  <h2>MAVSA</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eaque nobis quaerat blanditiis, laudantium culpa, quod nihil
                    eligendi libero error doloremque sit exercitationem
                    temporibus? Repellendus voluptas omnis praesentium suscipit
                    amet explicabo.
                  </p>
                </div>
              </div>
              <div className="partners-container mene-container">
                <Link
                  onClick={() => {
                    window.location.href =
                      "https://www.dnb.com/business-directory/company-profiles.mene.aaf58c26b41af678566998b62249574c.html";
                  }}
                >
                  <img
                    src={MenE}
                    alt="Logotipo de MenE"
                    className="img-container"
                  />
                </Link>
                <div className="info-mene">
                  <h2>MenE</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eum, culpa placeat nemo iste sint expedita? Sequi eum iusto
                    quae beatae amet, qui quidem similique doloremque dolore,
                    quia doloribus fugit excepturi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <DarkFooter />
      </div>
    </>
  );
};

export default Socios;
