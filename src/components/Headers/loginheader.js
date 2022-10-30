/*eslint-disable*/
import React, { useState } from "react";

// reactstrap components
import { Container } from "reactstrap";
import useAxios from "hooks/useAxios";
import useAlert from "hooks/useAlert";
import { useHistory } from "react-router-dom";

function Loginheader() {
  let pageHeader = React.createRef();
  const { post } = useAxios();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { openAlert } = useAlert();
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email && password) {
      console.log({ email, password });
      try {
        const response = await post("admin/login", { email, password });
        console.log({ response });
        if (response.data && response.data.access && response.data.refresh) {
          const token = response.data.access;
          localStorage.setItem("token", token);
          const refresh = response.data.refresh;
          localStorage.setItem("refresh", refresh);
          history.replace("/admin/home");
          window.location.reload();
        }
      } catch (error) {
        await openAlert(
          "Email o contraseña incorrectos. Por favor, intente de nuevo"
        );
        console.log({ error });
      }
    }
  };

  const onChange = (event) => {
    const name = event.target.name;
    if (name === "email") {
      setEmail(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  React.useEffect(() => {
    if (window.innerWidth > 891) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("../../assets/img/login.jpg") + ")",
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="content-center brand" style={{ marginTop: "15%" }}>
            <h1 className="h1-seo">Iniciar sesión</h1>
            <div className="principal">
              <div class="containerlog">
                <div class="d-flex justify-content-center h-100">
                  <div class="cardlog">
                    <div class="card-body">
                      <form onSubmit={handleSubmit}>
                        <div class="input-group form-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="fas fa-user"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            value={email}
                            onChange={onChange}
                            name="email"
                            class="form-control"
                            placeholder="username"
                            required
                          />
                        </div>
                        <div class="input-group form-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="fas fa-key"></i>
                            </span>
                          </div>
                          <input
                            type="password"
                            name="password"
                            class="form-control"
                            onChange={onChange}
                            value={password}
                            placeholder="password"
                            required
                          />
                        </div>
                        <div class="form-group">
                          <input
                            type="submit"
                            value="Login"
                            class="login_btn"
                          />
                       {/*    <div class="d-flex justify-content-center">
                            <a href="#">Forgot your password?</a>
                          </div> */}
                        </div>
                      </form>
                    </div>
                    <div class="card-footer"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Loginheader;
