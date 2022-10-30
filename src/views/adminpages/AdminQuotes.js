import React from "react";
import AdminPage from "../../components/AdminPage";
import AdminTitle from "../../components/AdminTitle";
import BreadCrum from "../../components/BreadCrum";
import AdminTable from "../../components/AdminTable";
import Select from "../../components/Select";
import SearchInput from "../../components/SearchInput";
import useTable from "../../hooks/useTable";
import "../../assets/css/admin-cotizaciones.css";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";

const links = [
  { name: "Inicio", path: "/admin/home" },
  { name: "Cotizaciones", path: "/admin/quotes" },
];

const fake = [
  {
    id: 1,
    name: "nodsadsa",
    email: "dsadsa@dsadsa.com",
    phone: "221321321",
    date: "DD/MM/AA",
    priority: "high",
  },
  {
    id: 2,
    name: "nodsadsa",
    email: "dsadsa@dsadsa.com",
    phone: "221321321",
    date: "DD/MM/AA",
    priority: "med",
  },
  {
    id: 3,
    name: "nodsadsa",
    email: "dsadsa@dsadsa.com",
    phone: "221321321",
    date: "DD/MM/AA",
    priority: "low",
  },
];

const AdminQuotes = (props) => {
  const {
    elements,
    onChangeSearchItem,
    extraParams,
    addExtraParams,
    removeExtraParam,
  } = useTable({
    endpoint: "admin/quotes",
  });

  const onChangePriority = (event) => {
    const priority = event.target.value;
    if (priority === "ALL") {
      removeExtraParam("priority");
    } else {
      addExtraParams({ priority });
    }
  };

  return (
    <AdminPage title="Cotizaciones">
      <BreadCrum links={links} />
      <AdminTitle>Ver cotizaciones</AdminTitle>
      <div
        className="space-between"
        style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
      >
        <DatePicker
          label="Selecciona una fecha"
          value={extraParams.date || new Date().toISOString()}
          onChange={(newValue) => addExtraParams({ date: newValue })}
          renderInput={(params) => <TextField {...params} />}
        />

      
        <Select
          value={extraParams.priority || ""}
          placeholder="Prioridad"
          options={[
            { label: "Todos", value: "ALL" },
            { label: "Baja", value: "L" },
            { label: "Media", value: "M" },
            { label: "Alta", value: "H" },
          ]}
          onChange={onChangePriority}
        />
      </div>
      <div className="space-between">
        <p>Mostrando {elements.length} resultados</p>
        <SearchInput
          name="search"
          onChange={onChangeSearchItem}
          placeholder="Buscar por nombre"
        />
      </div>
      <div className="Tablaadminlast2">
      <div class="contenidoDeTablaadmin">
      <AdminTable>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Fecha</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
          {elements.map((elmt) => (
            <tr key={elmt.id} className={elmt.priority}>
              <td>{elmt.first_name + " " + elmt.last_name}</td>
              <td>{elmt.email}</td>
              <td>{elmt.phone}</td>
              <td>{elmt.date}</td>
              <td>
                <Link to={`/admin/quote/${elmt.id}`}>Ver más</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </AdminTable>
      </div>
      </div>
    </AdminPage>
  );
};

export default AdminQuotes;
