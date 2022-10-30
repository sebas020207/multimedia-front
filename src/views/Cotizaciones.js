// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import "../assets/css/cotizaciones.css";
import DarkFooter from "components/Footers/DarkFooter.js";
import "../assets/css/quotescards.css";

import Cotizacionesheader from "components/Headers/cotizacionesheader";
import React, { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import Select from "react-select";
import { Link } from "react-router-dom";
import useTable from "hooks/useTable";

const Cotizaciones = (props) => {
  var [suppliers, setsup] = useState([]);
  var [subcategories, setsubcat] = useState([]);
  const { elements, addExtraParams, removeExtraParam } =
    useTable({
      endpoint: `/products`,
    });

  const { get } = useAxios();
  useEffect(() => {
    loadsuppliers();
    loadsubcategories();
    
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

  const changesup = (event) => {
    try {
      if (event.value === "") {
        removeExtraParam("supplier_id");
      } else {
        addExtraParams({ supplier_id: event.value });
      }
    } catch (error) {
      console.log("Error" + error.message);
    }
  };
  const changesubcat = (event) => {
    try {
        if (event.value === "") {
        removeExtraParam("subcategory_id");
      } else {
      addExtraParams({ subcategory_id: event.value });
      }
    } catch (error) {
      console.log("Error" + error.message);
    }
  };

  const changeorder = (event) => {
    try {
      addExtraParams({ order_by: event.value });
    } catch (error) {
      console.log("Error" + error.message);
    }
  };

  const loadsuppliers = async () => {
    try {
      const response = await get(`/suppliers`);
      if (response.data) {
        var array = [];
        array.push({ value: "", label: "------" });
        for (let i = 0; i < response.data.length; i++) {
          var element = response.data[i];
          var name = element["name"];
          var id = element["id"];
          var obj = { value: id, label: name };
          array.push(obj);
        }

        setsup(array);
      }
    } catch (error) {
      console.log("Error" + error.message);
    }
  };

  const loadsubcategories = async () => {
    try {
      const response = await get(`/subcategories`);
      if (response.data) {
        var array = [];
        array.push({ value: "", label: "------" });
        for (let i = 0; i < response.data.length; i++) {
          var element = response.data[i];
          var name = element["name"];
          var id = element["id"];
          var obj = { value: id, label: name };
          array.push(obj);
        }

        setsubcat(array);
      }
    } catch (error) {
      console.log("Error" + error.message);
    }
  };

  const optionsaz = [
    { value: "a_z", label: "A-Z" },
    { value: "z_a", label: "Z-A" },
  ];

  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <Cotizacionesheader />
        <section className="py-5">
          <hr style={{ marginLeft: "8%", marginRight: "8%" }}></hr>
          <div id="cardsdiv" style={{ marginLeft: "10%", marginRight: "20px" }}>
            <div style={{ marginRight: "1%" }}>
              <p>Filtrar: </p>
            </div>

            <div style={{ marginRight: "2%" }}>
              <Select
                placeholder={"Proveedor"}
                onChange={changesup}
                options={suppliers}
              />
            </div>

            <div>
              <Select
                placeholder={"Subcategoria"}
                onChange={changesubcat}
                options={subcategories}
              />
            </div>
            <div id="az" style={{ display: "flex" }}>
              <p style={{ marginRight: "2%" }}>Ordenar: </p>

              <Select
                placeholder={"Orden"}
                onChange={changeorder}
                options={optionsaz}
              />
            </div>
          </div>
          <hr style={{ marginLeft: "8%", marginRight: "8%" }}></hr>
          <div className=" px-4 px-lg-5 mt-5">
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              {elements.map((elemento, index) => (
                <div key={elemento.id} className="col mb-5">
                  <div className="card h-100">
                    <img
                      className="card-img-top"
                      src={
                        "http://localhost:8000/admin/product/images/" +
                        elemento.id
                      }
                      alt="..."
                    />

                    <div className="card-body p-4">
                      <div className="text-center">
                        <h5 className="fw-bolder"> {elemento.name}</h5>
                        {elemento.description}
                      </div>
                    </div>

                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                      <div className="text-center">
                        <div className="btn-outline-dark mt-auto">
                          <Link to={"/Cotizaciones/Detalles/" + elemento.id}>
                            Ver a detalle
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <DarkFooter />
    </>
  );
};

export default Cotizaciones;
