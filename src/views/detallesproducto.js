// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import "../assets/css/cotizaciones.css";
import "../assets/css/pdfstyles.css";
import DarkFooter from "components/Footers/DarkFooter.js";

import Cotizacionesheader from "components/Headers/cotizacionesheader";
import React, { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import {  useParams } from "react-router-dom";

const Detalle = (props) => {
  var [product, setproduct] = useState([]);
  const [statePDF, setStatePDF] = useState({
    pdf: null,
  });
  const { id } = useParams();
  const { get } = useAxios();

  useEffect(() => {
    loadproductbyid();
    loadPdf();
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  const loadproductbyid = async () => {
    try {
      const response = await get(`/products?id=` + id);
      if (response.data) setproduct(response.data[0]);
    } catch (error) {
      console.log("Error" + error.message);
    }
  };
    const loadPdf = async () => {
      if (!statePDF.pdf) {
     
          try {
            const url = "/product/" + id + "/pdf";
            const response = await get(url, { responseType: "blob" });

            if (response.data) {
              setStatePDF({ pdf: response.data });
            }
          } catch (error) {
            console.log(
              "Posiblemente no existe una imágen para este producto! (lo cual sería muy raro)"
            );
            console.log({ error });
          }
        }
      
    };
  const handdleAddproduct = (elemento) => {
    let productslocalstorage = localStorage.getItem("products");
    let products = productslocalstorage
      ? JSON.parse(productslocalstorage)
      : null;
    if (products) {
      if (products.indexOf(elemento.id) === -1) {
        products.push(elemento);
      }
    } else {
      products = [elemento];
    }
    window.location.reload(true);
    localStorage.setItem("products", JSON.stringify(products));
  };

  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <Cotizacionesheader />
        <section class="py-5">
          <div class="container px-4 px-lg-5 my-5">
            <div class="row gx-4 gx-lg-5 align-items-center">
              <div class="col-md-6">
                <img
                  class="card-img-top mb-5 mb-md-0"
                  src={
                    "http://localhost:8000/admin/product/images/" + product.id
                  }
                  alt="..."
                />
              </div>
              <div class="col-md-6">
                <div class="small mb-1">SKU: {product.id}</div>
                <h1 class="display-5 fw-bolder"> {product.name}</h1>
                <p class="lead">{product.description}</p>
                <div class="d-flex">
                  <button
                    class="btn-outline-dark flex-shrink-0"
                    type="button"
                    onClick={() => handdleAddproduct(product)}
                  >
                    <i
                      class="now-ui-icons shopping_bag-16"
                      style={{ paddingRight: "3%" }}
                    ></i>
                    Agregar a la hoja de cotización
                  </button>
                </div>
              </div>
            </div>
            <div class="row mb-60 mb-xs-40">
              <ul class="pro-info-tab-list section nav">
                <li>
                  <p style={{ fontWeight: "bold" }}>DATA SHEET</p>
                </li>
              </ul>
            </div>
            <div id="divpdf">
              <embed
                src={window.URL.createObjectURL(
                  new Blob([statePDF.pdf], { type: "application/pdf" })
                )}
                type="application/pdf"
                width="100%"
                height="400px"
              />
            </div>
          </div>
        </section>
      </div>
      <DarkFooter />
    </>
  );
};

export default Detalle;
