import React, { useState, useEffect } from "react";
import ImagenAdminDefault from "../../assets/img/default-profile-pic.png";
import AdminPage from "../../components/AdminPage";
import AdminTitle from "../../components/AdminTitle";
import BreadCrum from "../../components/BreadCrum";
import FormTextField from "../../components/FormTextField";
import FormTextArea from "../../components/FormTextArea";
import FormTelephone from "../../components/FormTelephone";
import FormEmail from "../../components/FormEmail";
import FormRadioButtons from "../../components/FormRadioButtons";
import FormPassword from "../../components/FormPassword";
import FormImage from "../../components/FormImage";
import FormSubmit from "../../components/FormSubmit";
import FormLeftSection from "../../components/FormLeftSection";
import FormRightSection from "../../components/FormRightSection";
import FormSubmitSection from "../../components/FormSubmitSection";
import useAxios from "../../hooks/useAxios";
import useAlert from "../../hooks/useAlert";
import { useHistory } from "react-router";

const links = [
  { name: "Usuarios", path: "/admin/users" },
  { name: "Agregar usuario", path: "/admin/add/user" },
];

const roles = ["primary", "secondary"];

const AdminAddUser = (props) => {
  const id = props.match.params.id;
  const isEdit = Boolean(id);
  const history = useHistory();
  const { get, post, put } = useAxios();
  const [state, setState] = useState({
    name: "",
    last_name: "",
    address: "",
    phone: "",
    email: "",
    pass: "",
    con_pass: ""
  });
  const [radioOptions, setRadioOptions] = useState([
    { title: "Primario", value: roles[0], id: roles[0], checked: false },
    { title: "Secundario", value: roles[1], id: roles[1], checked: true },
  ]);
  const [radioButton, setRadioButton] = useState(
    radioOptions[0].checked ? roles[0] : roles[1]
  );
  const [stateImage, setStateImage] = useState({
    image: null,
  });
  const [modifiedImage, setModifiedImage] = useState(false);

  const { openAlert } = useAlert();

  useEffect(() => {
    loadUser();
    loadImage();
    resetOptions();
  }, []);

  useEffect(() => {
    resetOptions();
  }, [radioButton]);

  const resetOptions = () => {
    setRadioOptions([
      { ...radioOptions[0], checked: radioButton == roles[0] ? true : false },
      { ...radioOptions[1], checked: radioButton == roles[1] ? true : false },
    ]);
    console.log("restarting options done");
  };

  const loadImage = async () => {
    console.log(stateImage.image);
    if(!stateImage.image){
      if (isEdit) {
        try {
          const url = "http://127.0.0.1:8000/admin/user/images/"+id;
          const response = await get(url, { responseType: "blob" });
          if (response.data) {
            setStateImage({ image: response.data });
          }
          console.log( response.data );
        } catch (error) {
          console.log("Posiblemente no existe una imágen para este usuario! D:");
          console.log({ error });
        }
      } else {
        setStateImage({ image: null });
      }
    }
  };

  const loadUser = async () => {
    if (!isEdit) return;
    try {
      const response = await get(`admin/user/${id}`);
      if (response.data) {
        setState({ ...state, ...response.data });
        setRadioButton(response.data.role ? roles[0] : roles[1]);
      }
      console.log({ state });
      console.log({ radioButton });
    } catch (error) {
      console.log({ error });
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setState({ ...state, [name]: value });
    console.log(name + ": " + value);
  };

  const handleOnChangeRadioButton = (event) => {
    const value = event.target.value;
    console.log("valor del rol: " + value);
    setRadioButton(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({ state });
    console.log({ radioButton });
    try {
      const data = new FormData();
      data.append("name", state.name);
      data.append("last_name", state.last_name);
      data.append("address", state.address);
      data.append("phone", state.phone);
      data.append("email", state.email);
      data.append("role", radioButton == roles[0]);
      data.append("is_active", 1);
      if(stateImage.image && modifiedImage)
        data.append("photo", stateImage.image);
      if (!isEdit)
        data.append("password", state.pass);
      
      let response;

      if (isEdit) {
        response = await put(`admin/user/${id}`, data);
        await tellMeWhatsGoingOn("Se editó el usuario correctamente");
      } else {
        if (state.pass == state.con_pass) {
          response = await post("admin/user", data);
          await tellMeWhatsGoingOn("Se agregó el usuario correctamente");
        } else {
          await tellMeWhatsGoingOn("Las contraseñas ingresadas no coinciden");
          console.log("XD");
          return;
        }
      }
      history.push("/admin/users");
      console.log({ response });
    } catch (error) {
      tellMeWhatsGoingOn("Surgió un problema al registrar el usuario");
      console.log({ error });
    }
  };

  const handleChangeImage = (event) => {
    const file = event.target.files ? event.target.files[0] : null;
    setStateImage({ image: file });
    setModifiedImage(true);
  };

  const tellMeWhatsGoingOn = async (message) => {
    const accept = await openAlert(message);
    if (accept) console.log("Accepted");
    else console.log("No accepted");
  };

  const showPassFiels = () => {
    if (!isEdit) {
      return (
        <>
          <hr />
          <FormPassword
            title="Contraseña"
            name="pass"
            id="pass"
            value={state.pass}
            onChange={handleChange}
            placeholder="**********"
            required
          />
          <FormPassword
            title="Confirmar contraseña"
            name="con_pass"
            id="con_pass"
            value={state.con_pass}
            onChange={handleChange}
            placeholder="**********"
            required
          />
        </>
      );
    }
  };

  return (
    <AdminPage title="Usuarios">
      <BreadCrum links={links} />
      <AdminTitle>{isEdit ? "Editar" : "Agregar"} usuario</AdminTitle>

      <form onSubmit={handleSubmit}>
        <FormLeftSection>
          <FormTextField
            title="Nombre(s)"
            name="name"
            id="name"
            value={state.name}
            onChange={handleChange}
            placeholder="Nombre1 Nombre2"
            required
          />
          <FormTextField
            title="Apellidos"
            name="last_name"
            id="last_name"
            value={state.last_name}
            onChange={handleChange}
            placeholder="Apellido1 Apellido2"
            required
          />
          <FormTextArea
            title="Dirección"
            name="address"
            id="address"
            value={state.address}
            onChange={handleChange}
            placeholder="Dirección"
            rows="5"
            required
          />
          <FormTelephone
            title="Número telefónico"
            name="phone"
            id="phone"
            value={state.phone}
            onChange={handleChange}
            placeholder="Teléfono"
            required
          />
          <FormEmail
            title="Correo electrónico"
            name="email"
            id="email"
            value={state.email}
            onChange={handleChange}
            placeholder="ejemplo@iedx.com"
            required
          />
          <FormRadioButtons
            title="Rol"
            name="role"
            onChange={handleOnChangeRadioButton}
            op={radioOptions}
          />
          {showPassFiels()}
        </FormLeftSection>
        <FormRightSection>
          <FormImage
            title="Imágen de perfil"
            name="profile-pic"
            id="profile-pic"
            msg="Seleccionar imágen"
            placeholder={ImagenAdminDefault}
            onChange={handleChangeImage}
            value={stateImage.image}
          />
        </FormRightSection>
        <FormSubmitSection>
          <FormSubmit name="submit" id="submit" value="Guardar" />
        </FormSubmitSection>
      </form>
    </AdminPage>
  );
};

export default AdminAddUser;

