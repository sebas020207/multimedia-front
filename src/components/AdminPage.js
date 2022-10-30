import React from "react";
import { Link, useHistory } from "react-router-dom";
import "../assets/css/adminlte.min.css";
import "../assets/css/OverlayScrollbars.min.css";
import "../assets/css/response.css";
import logo from "../assets/img/IEDX_LOGO-WITHOUTFONT.png";
import useMyInfo from "../hooks/useMyInfo";
import DarkFooter from "./Footers/DarkFooter";

const AdminPage = (props) => {
  const history = useHistory();
  const { role } = useMyInfo();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    history.replace("/login");
    window.location.reload();
  };

  return (
    <body className="sidebar-mini layout-fixed sidebar-collapse">
      <div className="wrapper">
        <main className={props.classNameName}>
          <nav
            className="main-header navbar navbar-expand navbar-white navbar-light"
            style={{ backgroundColor: "#01476B" }}
          >
            <ul className="navbar-nav" style={{ color: "white" }}>
              <li className="nav-item" id="men" style={{ color: "#00c9f0" }}>
                <a
                  className="nav-link"
                  data-widget="pushmenu"
                  role="button"
                  style={{ color: "#00c9f0" }}
                >
                  <i className="fas fa-bars"></i>
                </a>
              </li>
            </ul>
            <img
              src={logo}
              alt="IP-Logo"
              id="image"
              style={{ width: "80px" }}
            />
          </nav>
          <aside
            className="main-sidebar sidebar-dark-primary elevation-4"
            style={{ backgroundColor: "#01476B" }}
          >
            <Link to={"/"} className="brand-link">
              <img
                src={logo}
                alt="IP-Logo"
                className="brand-image img-circle elevation-3"
              />
            </Link>
            <div className="sidebar">
              <nav className="mt-2">
                <ul
                  className="nav nav-sidebar flex-column"
                  data-widget="treeview"
                  role="menu"
                  data-accordion="false"
                >
                  <li className="nav-header">INICIO</li>
                  <li className="nav-item">
                    <Link to={"/admin/home"} className="nav-link">
                      <i class="nav-icon fa-solid fa-house-user"></i>
                      &nbsp;&nbsp;
                      <p>Inicio</p>
                    </Link>
                  </li>
                  <li className="nav-header">PRODUCTOS</li>
                  <li className="nav-item">
                    <Link to={"/admin/products"} className="nav-link">
                      <i class="nav-icon fa-solid fa-boxes-stacked"></i>
                      &nbsp;&nbsp;
                      <p>Productos</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/admin/add/product"} className="nav-link">
                      <i class="nav-icon fa fa-plus" aria-hidden="true"></i>
                      &nbsp;&nbsp;
                      <p>Crear nuevo producto</p>
                    </Link>
                  </li>

                  {role ? (
                    <ul
                      className="nav nav-sidebar flex-column"
                      data-widget="treeview"
                      role="menu"
                      data-accordion="false"
                    >
                      <li className="nav-header">USUARIOS</li>
                      <li className="nav-item">
                        <Link to={"/admin/users"} className="nav-link">
                          <i className="nav-icon fas fa-user-circle"></i>

                          <p>Usuarios</p>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to={"/admin/add/user"} className="nav-link">
                          <i
                            class="nav-icon fa fa-user-plus"
                            aria-hidden="true"
                          ></i>

                          <p>Crear nuevo usuario</p>
                        </Link>
                      </li>
                    </ul>
                  ) : null}

                  <li className="nav-header">COTIZACIONES</li>
                  <li className="nav-item">
                    <Link to={"/admin/quotes"} className="nav-link">
                      <i class="nav-icon fa-solid fa-sack-dollar"></i>
                      &nbsp;&nbsp;
                      <p>Cotizaciones</p>
                    </Link>
                  </li>
                  {role ? (
                    <ul
                      className="nav nav-sidebar flex-column"
                      data-widget="treeview"
                      role="menu"
                      data-accordion="false"
                    >
                      <li class="nav-header">HISTORIAL</li>
                      <li class="nav-item">
                        <Link to={"/admin/historical"} className="nav-link">
                          <i class="nav-icon fas fa-book"></i>&nbsp;&nbsp;
                          <p>Historial</p>
                        </Link>
                      </li>
                    </ul>
                  ) : null}
                  <li class="nav-header">CERRAR SESIÓN</li>
                  <li class="nav-item">
                    <Link onClick={logout} class="nav-link">
                      <i class="nav-icon fas fa-door-closed text-danger"></i>
                      <p class="text">Cerrar sesión</p>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
          <div className="content-wrapper" style={{ backgroundSize: "cover" }}>
            <section className="content">{props.children}</section>
          </div>
        </main>
      </div>
      <DarkFooter />
    </body>
  );
};

export default AdminPage;
