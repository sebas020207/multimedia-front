import React from "react";


import "../assets/css/helper.css";
import "../assets/css/style.css";
// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import ContactoHeader from "components/Headers/ContactoHeader.js";
import DarkFooter from "components/Footers/DarkFooter.js";


import Iframe from "react-iframe";


const Contacto = (props) => {

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
        <ContactoHeader />

        <div className="page-section section mt-80 mt-lg-60 mt-md-60 mt-sm-60 mt-xs-40 mb-40 mb-lg-20 mb-md-20 mb-sm-20 mb-xs-0">
          <div className="container">
            <div className="row row-30">
              <div className="contact-info-wrap col-md-6 col-12 mb-40">
                <p>
                  Nuestros representantes siempre estan disponibles, en cuanto
                  obtengamos su informaciòn, le llamaremos antes posible{" "}
                </p>
                <ul className="contact-info">
                  <li>
                    <i className="fa fa-map-marker"></i>
                    <p>
                      {" "}
                      Coyoacan 1622, Col. Del Valle, Benito Juárez, Ciudad de
                      México, CP 03100
                    </p>
                    <div className="map">
                      <Iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.0832307066717!2d-99.17456638509438!3d19.365548486922435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff941809ef65%3A0x487b0fe9efee08a!2sAv.%20Coyoac%C3%A1n%201622%2C%20Col%20del%20Valle%20Sur%2C%20Benito%20Ju%C3%A1rez%2C%2003100%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1632379667080!5m2!1ses-419!2smx"
                        width="100%"
                        height="200"
                        style={{ border: "0" }}
                        loading="lazy"
                      />
                    </div>
                  </li>
                  <li>
                    <i className="fa fa-phone"></i>
                    <p>
                      <a >55 6425 4434</a>
                      <a >55 8974 0232</a>
                    </p>
                  </li>
                  <li>
                    <i className="fa fa-globe"></i>
                    <p>
                      <a >sales.mx@iedx.com.mx</a>
                    </p>
                  </li>
                </ul>
              </div>

              <div className="contact-form-wrap col-md-6 col-12 mb-40">
                <h3>Deje un mensaje</h3>
                <form id="contact-form" action="assets/php/mail.php">
                  <div className="contact-form">
                    <div className="row">
                      <div className="col-lg-6 col-12 mb-30">
                        <input type="text" name="name" placeholder="Nombre" />
                      </div>
                      <div className="col-lg-6 col-12 mb-30">
                        <input
                          type="email"
                          name="email"
                          placeholder="Correo Electronico"
                        />
                      </div>
                      <div className="col-lg-6 col-12 mb-30">
                        <input
                          type="tel"
                          name="telephone"
                          placeholder="Telefono"
                        />
                      </div>
                      <div className="col-lg-6 col-12 mb-30">
                        <input
                          type="text"
                          name="issue"
                          placeholder="Asunto"
                        />
                      </div>
                      <div className="col-12 mb-30">
                        <textarea
                          name="message"
                          placeholder="Mensaje"
                        ></textarea>
                      </div>
                      <div className="col-12">
                        <input type="submit" value="Enviar" />
                      </div>
                    </div>
                  </div>
                </form>
                <p className="form-messege"></p>
              </div>
            </div>
          </div>
        </div>
       
        <DarkFooter />
      </div>
    </>
  );
};

export default Contacto;
