import React from "react";
import LogoIedx from "../imagenes/edx logo.png";
import "../css/styles.css";
import { Link } from "react-router-dom";
import IedxLogoCircular from "../imagenes/EDX logo circle.png";
import PngWing from "../imagenes/pngwing.com.png";

const Page = (props) => {
  document.title = props.title || "Sin titulo";
  return (
    <>
      <header className="header">
        <div className="container logo-nav-container">
          <Link to="/">
            <img src={LogoIedx} alt="logo_edx" width="250px" />
          </Link>

          <div id="contacto">
            <p>Contacto directo +52 (556)-425-​4434</p>
          </div>
        </div>
      </header>

      <nav>
        <ul className="nav">
          <div className="van"></div>
          <li id="init">
            <Link to="/">Inicio</Link>
          </li>

          <li id="we">
            <Link to="/nosotros">Nosotros</Link>
          </li>
          <li id="products">
            <Link to="/productos">Categorías</Link>
          </li>
          <li id="quotes">
            <Link to="/cotizaciones">Cotizaciones</Link>
          </li>
          <li id="contact">
            <Link to="/contacto">Contacto</Link>
          </li>
          <li id="partners">
            <Link to="/socios">Socios</Link>
          </li>
        </ul>
      </nav>

      {props.children}

      <footer className="footer space-between" style={{ padding: "2rem 4rem" }}>
        <div className="space-between">
          <img src={IedxLogoCircular} alt="logo_edx" width="125px" style={{marginRight: '2rem', marginLeft: '2rem'}}/>
          <hr width="1" size="120" style={{ marginRight: "2rem" }} />
        </div>
        <Link to="/aviso">Aviso de privacidad</Link>
        <Link style={{marginRight: '10%'}} onClick={()=>{ window.location.href='https://www.facebook.com/pages/category/Product-Service/EDX-M%C3%A9xico-Internacional-111281250752942/'; }} ><i class="fab fa-facebook fa-3x"></i></Link>
        
      </footer>
    </>
  );
};

/*
 *








    <script src="index_script.js" type="text/javascript"></script>



*/

export default Page;
