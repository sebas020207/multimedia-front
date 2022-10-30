import React, { useEffect, useState } from "react";
import AdminPage from "../../components/AdminPage";
import AdminTitle from "../../components/AdminTitle";
import BreadCrum from "../../components/BreadCrum";
import AdminTable from "../../components/AdminTable";
import Select from "../../components/Select";
import SearchInput from "../../components/SearchInput";
import ContextMenu, { createContextOption } from "../../components/ContextMenu";
import TreeDotsButton from "../../components/TreeDotsButton";
import useTable from "../../hooks/useTable";
import useAlert from "../../hooks/useAlert";
import useAxios from "../../hooks/useAxios";
import { useHistory } from "react-router";

const links = [
  { name: "Usuarios", path: "/admin/users" },
  { name: "Ver usuarios", path: "/admin/users" },
];

const AdminUsers = (props) => {
  const history = useHistory();
  const {
    search,
    onChangeSearchItem,
    elements,
    extraParams,
    addExtraParams,
  } = useTable({
    endpoint: "admin/users",
  });
  const [count, setCount] = useState(0);
  const { openAlert } = useAlert();
  const { get, put } = useAxios();

  const edit = (id) => history.push(`/admin/edit/user/${id}`);
  const del = async (id) => {
    const option = await openAlert("¿Quieres borrar a este usuario?");
    if(option) {
      try {
        const data = new FormData();
        data.append('is_active',0);
        const response = await put(`/admin/user/${id}`,data);
        search();
        getCount();
        await openAlert("Se ha borrado el usuario satisfactoriamente.");
        console.log({ response });
      } catch (error) {
        await openAlert("Ha ocurrido un error inesperado.");
        console.log(error);
      }
    }
  };

  const contextMenuOptions = [
    createContextOption("Editar", edit),
    createContextOption("Borrar", del)
  ];
  
  const getCount = async () => {
    try {
      const response = await get(`admin/users/count`);
      setCount(response.data.users);
    } catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCount();
  }, []);
  
  return (
    <AdminPage title="Usuarios">
      <BreadCrum links={links} />
      <AdminTitle>Ver usuarios</AdminTitle>

      <div className="space-between" style={{ margin: "2rem 0rem 3rem 0rem" }}>
        <AdminTable style={{ width: "50%" }}>
          <thead>
            <tr>
              <th className="FH" >Usuarios</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{count}</td>
            </tr>
          </tbody>
        </AdminTable>
        <Select
          name="order-by"
          value={extraParams.order_by || "a_z"}
          options={[
            { value: "a_z", label: "A-Z" },
            { value: "z_a", label: "Z-A" },
          ]}
          onChange={(event) => addExtraParams({ order_by: event.target.value })}
        />
      </div>
      <div className="space-between">
        <p>Mostrando {elements.length} resultados</p>
        <SearchInput
          name="search"
          onChange={onChangeSearchItem}
          placeholder="Buscar usuarios"
        />
      </div>
      <div className="Tablaadmin">
      <div class="contenidoDeTablaadmin">
      <AdminTable>
        <thead>
          <tr>
            <th>#</th>
            <th className="FH">Nombre</th>
            <th className="FH">Apellidos</th>
            <th className="FH">Correo</th>
            <th className="FH">Teléfono</th>
            <th className="FH">Dirección</th>
            <th className="FH">Rol</th>
            <th className="FH">Acción</th>
          </tr>
        </thead>
        <tbody>
          {elements.map((elmt) => (
            <tr key={elmt.id}>
              <td>{elmt.id} </td>
              <td>{elmt.name}</td>
              <td>{elmt.last_name}</td>
              <td>{elmt.email}</td>
              <td>{elmt.phone}</td>
              <td>{elmt.address}</td>
              <td>{elmt.role ? 'Superadmin' : 'Editor'}</td>
              <td>
                <ContextMenu
                  id={elmt.id}
                  ButtonComponent={TreeDotsButton}
                  options={contextMenuOptions}
                />
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

export default AdminUsers;
