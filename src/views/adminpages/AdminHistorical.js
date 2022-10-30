import React from "react";
import AdminPage from "../../components/AdminPage";
import AdminTitle from "../../components/AdminTitle";
import BreadCrum from "../../components/BreadCrum";
import AdminTable from "../../components/AdminTable";
import SearchInput from "../../components/SearchInput";
import useTable from "../../hooks/useTable";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";

const links = [
  { name: "Inicio", path: "/admin/home" },
  { name: "Historial de cambios", path: "/admin/historical" },
];

const AdminHistorical = (props) => {
  const {
    elements,
    onChangeSearchItem,
    extraParams,
    addExtraParams,
  } = useTable({
    endpoint: "admin/historical",
  });

  return (
    <AdminPage title="Historial">
      <BreadCrum links={links} />
      <AdminTitle>Historial</AdminTitle>
      <div
        className="space-between"
        style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
      >
        <DatePicker
          label="Selecciona una fecha"
          value={extraParams.order_by || new Date().toISOString()}
          onChange={(newValue) => addExtraParams({ order_by: newValue })}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
      <div className="space-between">
        <p>Mostrando {elements.length} resultados</p>
        <SearchInput
          name="search"
          placeholder="Buscar por nombre"
          onChange={onChangeSearchItem}
        />
      </div>
      <div className="Tablaadminlast2">
      <div class="contenidoDeTablaadmin">
      <AdminTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {elements.map((elemento) => (
            <tr key={elemento.id}>
              <td>{elemento.id}</td>
              <td>{elemento.name}</td>
              <td>{elemento.date}</td>
              <td>{elemento.hour}</td>
              <td>{elemento.action}</td>
            </tr>
          ))}
        </tbody>
      </AdminTable>
      </div>
      </div>
    </AdminPage>
  );
};

export default AdminHistorical;
