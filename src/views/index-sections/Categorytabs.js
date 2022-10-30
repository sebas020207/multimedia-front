import React from "react";
import ReactPlayer from "react-player";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components

function Categorytabs() {
  const [iconPills, setIconPills] = React.useState("1");
  const [pills, setPills] = React.useState("1");
  return (
    <>
      <div className="section section-tabs">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" md="10" xl="6">
              <Card style={{ height: "325px" }}>
                <CardHeader>
                  <Nav
                    className="nav-tabs-neutral justify-content-center"
                    data-background-color="black"
                    role="tablist"
                    tabs
                  >
                    <NavItem>
                      <p
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Diferentes productos que llevarán a tu empresa al
                        siguiente nivel.
                      </p>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody>
                  <TabContent
                    className="text-center"
                    activeTab={"iconPills" + iconPills}
                  >
                    <TabPane tabId="iconPills1">
                      <p style={{ fontSize: "25px" }}>
                        Nuestros principales socios comerciales tienen los
                        mejores productos para ayudar a tu empresa ha alcanzar
                        tus metas de producción sin contratiempos.
                      </p>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
            <Col className="ml-auto mr-auto" md="10" xl="6">
              <Card style={{ height: "325px" }}>
                <CardHeader>
                  <Nav
                    className="nav-tabs-neutral justify-content-center"
                    data-background-color="blue"
                    role="tablist"
                    tabs
                  >
                    <NavItem>
                      <NavLink
                        className={pills === "1" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("1");
                        }}
                      >
                        MAQUINARIA Y REFACCIONES
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "2" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("2");
                        }}
                      >
                        MANEJO DE ENVASES
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "3" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("3");
                        }}
                      >
                        LUBRICANTES
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody>
                  <TabContent
                    className="text-center"
                    activeTab={"pills" + pills}
                  >
                    <TabPane tabId="pills1">
                      <p>
                        La integración total del sistema es extremadamente
                        importante en la producción de contenedores de alta
                        calidad y alta velocidad. MAVSA diseña y produce
                        subsistemas que maximizan el control y la regulación
                        general del peso, la forma y la temperatura.
                      </p>
                    </TabPane>
                    <TabPane tabId="pills2">
                      <p>
                        Nuestro grafito es grado isotrópico lo que le confiere
                        una estructura y tamaño de partícula homogénea,
                        otorgándole mejores propiedades al material: mayor
                        durabilidad y resistencia a la alta temperatura.
                      </p>
                    </TabPane>
                    <TabPane tabId="pills3">
                      <p>
                        I think that’s a responsibility that I have, to push
                        possibilities, to show people, this is the level that
                        things could be at. So when you get something that has
                        the name Kanye West on it, it’s supposed to be pushing
                        the furthest possibilities. I will be the leader of a
                        company that ends up being worth billions of dollars,
                        because I got the answers. I understand culture. I am
                        the nucleus.
                      </p>
                    </TabPane>
                    <TabPane tabId="pills4">
                      <p>
                        "I will be the leader of a company that ends up being
                        worth billions of dollars, because I got the answers. I
                        understand culture. I am the nucleus. I think that’s a
                        responsibility that I have, to push possibilities, to
                        show people, this is the level that things could be at."
                      </p>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <ReactPlayer url="https://www.youtube.com/watch?v=A_M8WBJMcM0" />
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Categorytabs;
