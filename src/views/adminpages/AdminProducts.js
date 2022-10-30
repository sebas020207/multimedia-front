import React, { useEffect, useState } from "react";
import AdminPage from "../../components/AdminPage";
import AdminTitle from "../../components/AdminTitle";
import BreadCrum from "../../components/BreadCrum";
import AdminTable from "../../components/AdminTable";
import Select from "../../components/Select";
import SearchInput from "../../components/SearchInput";
import ContextMenu, { createContextOption } from "../../components/ContextMenu";
import useTable from "../../hooks/useTable";
import TreeDotsButton from "../../components/TreeDotsButton";
import useAxios from "../../hooks/useAxios";
import useAlert from "../../hooks/useAlert";
import { useHistory } from "react-router";

const links = [
  { name: "Productos", path: "/admin/products" },
  { name: "Ver productos", path: "/admin/products" },
];

const AdminProducts = (props) => {
  const history = useHistory();
  const {
    search,
    elements,
    onChangeSearchItem,
    addExtraParams,
    extraParams,
    removeExtraParam,
  } = useTable({
    endpoint: "admin/products",
  });
  const [count, setCount] = useState({
    active: 0,
    inactive: 0,
    categories: 0
  });
  const { openAlert } = useAlert();
  const { get, put } = useAxios();

  const edit = (id) => history.push(`/admin/edit/product/${id}`);
  const archive = async (id) => {
    const option = await openAlert("¿Quieres archivar este producto?");
    if(option) {
      try {
        const data = new FormData();
        data.append('is_archived',1);
        const response = await put(`/admin/product/${id}`,data);
        search();
        getCount();
        await openAlert("Se ha archivado el producto satisfactoriamente.");
        console.log({ response });
      } catch (error) {
        await openAlert("Ha ocurrido un error inesperado.");
        console.log(error);
      }
    }
  };
  const unarchive = async (id) => {
    const option = await openAlert("¿Quieres desarchivar este producto?");
    if(option) {
      try {
        const data = new FormData();
        data.append('is_archived',0);
        const response = await put(`/admin/product/${id}`,data);
        search();
        getCount();
        await openAlert("Se ha desarchivado el producto satisfactoriamente.");
        console.log({ response });
      } catch (error) {
        await openAlert("Ha ocurrido un error inesperado.");
        console.log(error);
      }
    }
  };

  const contextMenuOptionsActive = [
    createContextOption("Editar", edit),
    createContextOption("Archivar", archive)
  ];
  const contextMenuOptionsArchived = [
    createContextOption("Editar", edit),
    createContextOption("Desarchivar", unarchive)
  ];

  const onChangeIsActive = (event) => {
    const value = event.target.value;
    if (value === "all") {
      removeExtraParam("is_active");
    } else {
      addExtraParams({
        is_active: value,
      });
    }
  };

  const getCount = async () => {
    try {
      const response = await get(`admin/products/count`);
      setCount(response.data);
    } catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCount();
  }, []);

  return (
    <AdminPage title="Productos" className="admin-products">
      <BreadCrum links={links} />
      <AdminTitle>Ver productos</AdminTitle>

      <div className="space-between" style={{ margin: "2rem 0rem 3rem 0rem" }}>
        <AdminTable style={{ width: "50%" }}>
          <thead>
            <tr>
              <th className="FH">Activos</th>
              <th className="FH">Archivados</th>
              <th className="FH">Categoria</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{count.active}</td>
              <td>{count.inactive}</td>
              <td>{count.categories}</td>
            </tr>
          </tbody>
        </AdminTable>

        <Select
          id="product-status"
          name="product-status"
          onChange={onChangeIsActive}
          value={extraParams.is_active || "all"}
          options={[
            { value: "all", label: "Todos" },
            { value: 1, label: "Activos" },
            { value: 0, label: "Archivados" },
          ]}
        />
      </div>
      <div className="space-between">
        <p>Mostrando {elements.length} resultados</p>
        <SearchInput
          name="search"
          onChange={onChangeSearchItem}
          placeholder="Buscar productos"
        />
      </div>


      <div className="Tablaadmin">
      <div class="contenidoDeTablaadmin">
      <AdminTable>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {elements.map((elmt) => (
            <tr key={elmt.id}>
              <td>{elmt.name}</td>
              <td>{elmt.description}</td>
              <td>
                <ContextMenu
                  id={elmt.id}
                  ButtonComponent={TreeDotsButton}
                  options={elmt.is_archived ? contextMenuOptionsArchived : contextMenuOptionsActive}
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

export default AdminProducts;
