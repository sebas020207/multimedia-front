import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminPage from "../../components/AdminPage";
import useMyInfo from "../../hooks/useMyInfo";

const AdminHome = (props) => {
  const { name, last_name, address, phone, email, role, userImageUrl } = useMyInfo();
  return (
    <AdminPage title="Inicio">
      <div class="d-flex justify-content-center">
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-5">
              <div class="d-flex justify-content-center">
                <div class="img-card-logo">
                  <div class="d-flex justify-content-center">
                    <img src={userImageUrl} alt="Foto de usuario" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-7">
              <div class="card-body">
                <h1 class="card-title text-center">Bienvenido!</h1>

                <p class="card-text text-justify">
                  {name} {last_name}
                  <p>
                    {role
                      ? "Administrador Principal"
                      : "Administrador secundario"}
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-table table-responsive mb-40">
        <table>
          <thead>
            <tr>
              <th class="pro-thumbnail">Nombre</th>
              <th class="pro-title">Dirección</th>
              <th class="pro-title">Telefono</th>
              <th class="pro-remove">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="pro-thumbnail">
                <p>
                  {name} {last_name}
                </p>
              </td>
              <td class="pro-title">
                <p>{address}</p>
              </td>
              <td class="pro-title">
                <p>{phone}</p>
              </td>
              <td class="pro-title">
                <p>{email}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <Link to="/admin/edit">
          <button className="btn-primary">Cambiar datos</button>
        </Link>
      </div>
    </AdminPage>
  );
};

export default AdminHome;
