import React, { useState, useEffect } from "react";
import AdminPage from "../../components/AdminPage";
import AdminTitle from "../../components/AdminTitle";
import BreadCrum from "../../components/BreadCrum";
import AdminTable from "../../components/AdminTable";
import Subtitle from "../../components/Subtitle";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import "../../assets/css/admin-cotizaciones.css";
import "../../assets/css/admin-detalles-cotizacion.css";

const AdminQuoteDetails = (props) => {
  const { id } = useParams();
  const { get } = useAxios();
  const [state, setState] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    mobile_phone: "",
    phone: "",
    company: "",
    area: "",
    priority: "",
    date: "",
    product:[ ]
  });

  useEffect(() => {
    loadDetails();
  }, []);

  const loadDetails = async () => {
    try {
      const response = await get(`admin/quote/${id}`);
      //console.log(response.data);
      setState({ ...state, ...response.data });
    } catch (error) {
      console.log({ error });
    }
  };

  const links = [
    { name: "Inicio", path: "/admin/home" },
    { name: "Cotizaciones", path: "/admin/quotes" },
    { name: "Detalles de cotización", path: "/admin/quote/" + id },
  ];

  return (
    <AdminPage title="Detalles de cotización">
      <BreadCrum links={links} />
      <AdminTitle>Detalles de cotización</AdminTitle>
      <Subtitle>Información del usuario:</Subtitle>

      <AdminTable>
        <thead>
          <tr>
            <th className="FH" colSpan="2">
              <b>FECHA Y HORA</b>
            </th>
            <th className="FH" colSpan="2">
            {state.date}
            </th>
          </tr>
          
        </thead>

        <tbody key={state.id}>
          
          <tr>
            <th className="FH" colSpan="2">
              <b>Correo Electrónico</b>
            </th>
            <th className="FH"  colSpan="2">{state.email}</th>
          </tr>
          <tr>
            <td>
              <b>Nombre</b>
            </td>
            <td>{state.first_name}</td>
            <td>
              <b>Empresa</b>
            </td>
            <td>{state.company}</td>
          </tr>
          <tr>
            <td>
              <b>Apellidos</b>
            </td>
            <td>{state.last_name}</td>
            <td>
              <b>Teléfono Móvil</b>
            </td>
            <td>{state.mobile_phone}</td>
          </tr>
          <tr>
            <td>
              <b>Dirección</b>
            </td>
            <td>{state.address}</td>
            <td>
              <b>Teléfono Fijo</b>
            </td>
            <td>{state.phone}</td>
          </tr>
          <tr>
            <td>
              <b>Área</b>
            </td>
            <td>{state.area}</td>
            <td>
              <b>Prioridad</b>
            </td>
            <td>{state.priority}</td>
          </tr>
        
        </tbody>

      </AdminTable>
      <Subtitle>Consulta realizada:</Subtitle>
      <AdminTable>

        <thead>
          <tr>
            <th className="FH"  colSpan="4">
              <b>PRODUCTOS SOLICITADOS</b>
            </th>
          </tr>
          <tr>
            <th className="FH" >Imagen</th>
            <th className="FH" >Nombre</th>
            <th className="FH" >Descripción</th>
            <th className="FH" >Provedor</th>
          </tr>
        </thead>
        <tbody>

          {state.product.map(elemento => (
            <tr key={elemento.id}>
            <td>
              <img
                src={
                  "http://localhost:8000/admin/product/images/" +
                  elemento.id
                }
                width="135"
                height="40"
                alt="No se Encontró la Imágen"
              />
            </td>
            <td>
              <h4>{elemento.name}</h4>
            </td>
            <td>
              <p>{elemento.description}</p>
            </td>
            <td>
              <p>{elemento.supplier_id}</p>
            </td>
          </tr>
          ))}

        </tbody>
      </AdminTable>
    </AdminPage>
  );
};

export default AdminQuoteDetails;