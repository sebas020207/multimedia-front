import React from "react";
import { Route } from "react-router-dom";
import Nosotros from "views/nosotros.js";
import Index from "../views/Index.js";
import Cotizaciones from "../views/Cotizaciones.js";
import Categorias from "../views/Categorias.js";
import Contacto from "views/Contacto.js";
import Socios from "views/Socios.js";
import Login from "views/Login.js";
import Detalle from "views/detallesproducto.js";
import HojadeCotizacion from "views/hojadecotizacion.js";


const PublicRoutes = (props) => {
  return (
    <>
      <Route path="/Cotizaciones" exact component={Cotizaciones} />
      <Route path="/Cotizaciones/Detalles/:id" exact component={Detalle} />
      <Route path="/Categorias" exact component={Categorias} />
      <Route path="/" exact component={Index} />
      <Route path="/nosotros" exact component={Nosotros} />
      <Route path="/contacto" exact component={Contacto} />
      <Route path="/socios" exact component={Socios} />
      <Route path="/login" exact component={Login} />
      <Route path="/hojadecotizacion" exact component={HojadeCotizacion} />
    </>
  );
};

export default PublicRoutes;
