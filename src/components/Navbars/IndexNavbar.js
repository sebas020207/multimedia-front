import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";

function IndexNavbar() {
  const [navbarColor, setNavbarColor] = useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = useState(false);
  var [products, setproducts] = useState([]);


  useEffect(() => {
       loadcount();
       const updateNavbarColor = () => {
         if (
           document.documentElement.scrollTop > 399 ||
           document.body.scrollTop > 399
         ) {
           setNavbarColor("");
         } else if (
           document.documentElement.scrollTop < 400 ||
           document.body.scrollTop < 400
         ) {
           setNavbarColor("navbar-transparent");
         }
       };
       window.addEventListener("scroll", updateNavbarColor);
       return function cleanup() {
         window.removeEventListener("scroll", updateNavbarColor);
       };
    
  }, []);

      const loadcount = async () => {
       let productslocalstorage = localStorage.getItem("products");
       let products = productslocalstorage? JSON.parse(productslocalstorage) : null;
       setproducts(products);
      };


  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand>
              <Link to="/">IEDX</Link>
            </NavbarBrand>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              <NavItem>
                <NavLink>
                  <i className="now-ui-icons users_circle-08"></i>
                  <Link to="/Login">Login(Administración)</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <i className="now-ui-icons emoticons_satisfied"></i>
                  <Link to="/nosotros">Nosotros</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <i className="now-ui-icons design_bullet-list-67"></i>
                  <Link to="/Categorias">Categorias</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <i className="now-ui-icons files_paper"></i>
                  <Link to="/Cotizaciones">Cotizaciones</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <i className="now-ui-icons ui-1_email-85"></i>
                  <Link to="/Contacto">Contacto</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <i className="now-ui-icons design_vector"></i>
                  <Link to="/Socios">Socios</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <i className="now-ui-icons shopping_bag-16"></i>
                  <Link to="/hojadecotizacion">{products.length}</Link>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default IndexNavbar;
