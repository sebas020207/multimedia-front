// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
//import "../assets/css/cotizaciones.css";
import DarkFooter from "components/Footers/DarkFooter.js";

// sections for this page
import React, { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import { Link } from "react-router-dom";
import Hojaheader from "components/Headers/Hojaheader";
import { Alert } from "reactstrap";
import useAlert from "hooks/useAlert.js";

const HojadeCotizacion = (props) => {
  var [products, setproducts] = useState([]);
  const productosEnviados = products.map((product) => ({ id: product.id }));
  const { openAlert } = useAlert();
  const { post } = useAxios();
  const [state, setState] = useState({
    first_name: "",
    last_name: "N/A",
    email: "",
    address: "N/A",
    mobile_phone: "",
    phone: "N/A",
    company: "",
    area: "N/A",
    priority: "",
    product: [],
  });

  useEffect(() => {
    handdleloadproduct();
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

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setState({ ...state, [name]: value });
  };

  const handdleloadproduct = (elemento) => {
    let productslocalstorage = localStorage.getItem("products");
    let products = productslocalstorage
      ? JSON.parse(productslocalstorage)
      : null;
    if (products == null) {
      Alert("No hay productos en tu hoja de cotización");
    } else {
      setproducts(products);
    }
  };

  const handdleDelproduct = (elemento) => {
    let productslocalstorage = localStorage.getItem("products");
    let products = productslocalstorage
      ? JSON.parse(productslocalstorage)
      : null;
    if (products) {
      if (products.indexOf(elemento.id) === -1) {
        products.pop(elemento);
      }
    } else {
      products = [elemento];
    }
    window.location.reload(true);
    localStorage.setItem("products", JSON.stringify(products));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({ state });

    try {
      const quote = {
        first_name: state.first_name,
        last_name: state.last_name,
        email: state.email,
        address: state.address,
        mobile_phone: state.mobile_phone,
        phone: state.phone,
        company: state.company,
        area: state.area,
        priority: state.priority,
        product: productosEnviados,
      };

      console.log({ quote });
      let response;
      response = await post("quote", quote);
      await openAlert("Se guardó la información correctamente");
      console.log({ response });
    } catch (error) {
      await openAlert("Surgió un problema al solicitar cotización");
      console.log({ error });
    }
  };

  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <Hojaheader />

        <div class="page-section section mt-80 mt-lg-60 mt-md-60 mt-sm-60 mt-xs-40 mb-40 mb-lg-20 mb-md-20 mb-sm-20 mb-xs-0">
          <div class="container">
            <form onSubmit={handleSubmit} autoComplete="True">
              <div class="row">
                <div class="col-12">
                  <div class="cart-table table-responsive mb-40">
                    <table>
                      <thead>
                        <tr>
                          <th class="pro-thumbnail">Imagen</th>
                          <th class="pro-title">Producto</th>
                          <th class="pro-title">Descripciòn</th>
                          <th class="pro-remove">Remover</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((elemento, index) => (
                          <tr>
                            <td class="pro-thumbnail">
                              <a >
                                <img
                                  src={
                                    "http://localhost:8000/admin/product/images/" +
                                    elemento.id
                                  }
                                  alt=""
                                />
                              </a>
                            </td>
                            <td class="pro-title">
                              <Link
                                to={"/Cotizaciones/Detalles/" + elemento.id}
                              >
                                {elemento.name}
                              </Link>
                            </td>
                            <td class="pro-title">
                              <p>{elemento.description}</p>
                            </td>
                            <td
                              onClick={() => handdleDelproduct(elemento)}
                              class="pro-remove"
                            >
                              <a >×</a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div
                  style={{ marginRight: "13%" }}
                  class="col-lg-4 col-md-5 col-12"
                >
                  <div class="cart">
                    <h3>Total de productos</h3>
                    <table>
                      <tbody>
                        <tr class="order-total">
                          <th>Unidades: </th>
                          <td>
                            <strong>
                              <span class="amount"> {products.length}</span>
                            </strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="contact-form-wrap col-md-6 col-12 mb-40">
                  <br></br>
                  <br></br>
                  <h3>Información de cotización</h3>

                  <div class="contact-form">
                    <div class="row">
                      <div class="col-lg-6 col-12 mb-30">
                        <input
                          required
                          onChange={handleChange}
                          type="text"
                          name="first_name"
                          placeholder="Nombre"
                        />
                      </div>
                      <div class="col-lg-6 col-12 mb-30">
                        <input
                          required
                          onChange={handleChange}
                          type="email"
                          name="email"
                          placeholder="Correo Electronico"
                        />
                      </div>
                      <div class="col-lg-6 col-12 mb-30">
                        <input
                          required
                          onChange={handleChange}
                          type="tel"
                          name="mobile_phone"
                          placeholder="Telefono"
                        />
                      </div>
                      <div class="col-lg-6 col-12 mb-30">
                        <input
                          required
                          onChange={handleChange}
                          type="text"
                          name="company"
                          placeholder="Compañia"
                        />
                      </div>
                      <div class="col-lg-6 col-12 mb-30">
                        <select
                          name="priority"
                          required
                          onChange={handleChange}
                        >
                          <optgroup label="Prioridad">
                            <option value="H">Alta</option>
                            <option value="M">Media</option>
                            <option value="L">Baja</option>
                          </optgroup>
                        </select>
                      </div>

                      <div class="col-12">
                        <input type="submit" value="Enviar" />
                      </div>
                    </div>
                  </div>

                  <p class="form-messege"></p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <DarkFooter />
    </>
  );
};

export default HojadeCotizacion;
