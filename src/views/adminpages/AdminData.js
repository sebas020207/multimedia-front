import React, { useState } from "react";
import AdminPage from '../../components/AdminPage';
import AdminTitle from "../../components/AdminTitle";
import BreadCrum from "../../components/BreadCrum";
import { FormS, ButtonArea, Button, SuccessMessage, FailedMessage } from "../../components/StyledForms";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import FInput from "../../components/FormInput";
import useAxios from "../../hooks/useAxios";
import useAlert from "../../hooks/useAlert";
import { useHistory } from "react-router";

const links = [
    { name: "Inicio", path: "/admin/home" },
    { name: "Cambiar datos", path: "/admin/edit" },
  ];

const AdminData = (props) => {
    const { put } = useAxios();
    const { openAlert } = useAlert();
    const history = useHistory();
    const [phone, changePhone] = useState({campo: '', valido: null});
    const [phone2, changePhone2] = useState({campo: '', valido: null});
    const [email, changeEmail] = useState({campo: '', valido: null});
    const [email2, changeEmail2] = useState({campo: '', valido: null});
    const [password, changePassword] = useState({campo: '', valido: null});
    const [password2, changePassword2] = useState({campo: '', valido: null});
    const [oldPassword, changeOldPassword] = useState({campo: '', valido: null});
    const [validForm, changeValidForm] = useState(null);

    const expressions = {
        password: /^.{8,30}$/, // 8 a 30 digitos.
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        phone: /^\d{10}$/ // 10 numeros.
    }

    const validarPassword2 = () => {
        if(password.campo.length > 0){
            if(password.campo !== password2.campo){
                changePassword2((prevState) => {
                    return {...prevState, valido: 'false'}
                });
                //console.log('Las contraseñas no son iguales');
            }else{
                changePassword2((prevState) => {
                    return {...prevState, valido: 'true'}
                });
                //console.log('Las contraseñas son iguales');
            }
        }
        if(password.campo === "" && password2.campo === ""){
            changePassword2((prevState) => {
                return {...prevState, valido: null}
            });
        }
    }

    const validarEmail2 = () => {
        if(email.campo.length > 0){
            if(email.campo !== email2.campo){
                changeEmail2((prevState) => {
                    return {...prevState, valido: 'false'}
                });
            }else{
                changeEmail2((prevState) => {
                    return {...prevState, valido: 'true'}
                });
            }
        }
        if(email.campo === "" && email2.campo === ""){
            changeEmail2((prevState) => {
                return {...prevState, valido: null}
            });
        }
    }

    const validarPhone2 = () => {
        if(phone.campo.length > 0){
            if(phone.campo !== phone2.campo){
                changePhone2((prevState) => {
                    return {...prevState, valido: 'false'}
                });
            }else{
                changePhone2((prevState) => {
                    return {...prevState, valido: 'true'}
                });
            }
        }
        if(phone.campo === "" && phone2.campo === ""){
            changePhone2((prevState) => {
                return {...prevState, valido: null}
            });
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        var updated = 0;

        if(phone.campo === '' && phone2.campo === '' && email.campo === '' && email2.campo === '' && password.campo === '' && password2.campo === ''){
            tellMeWhatsGoingOn("Aun no se ha modificado algún campo.");
            return;
        }

        if(phone.valido !== null || email.valido !== null || password.valido !== null){
            //Posibles cambios entre Telefono e Email
            if((phone.valido === 'true' && phone2.valido === 'true') && (email2.valido === 'true' && email.valido === 'true')){
                //Se cambian telefono y correo
                try{
                    let response = await put(`admin/my_info`, {"email": email.campo,"phone": phone.campo});
                    await tellMeWhatsGoingOn("Se editó el correo y el teléfono correctamente");
                    history.push("/admin/home");
                    window.location.reload();

                    console.log({ response });
                } catch (error) {
                    tellMeWhatsGoingOn("Surgió un problema al editar el correo y el teléfono");
                    console.log({ error });
                }
                updated = 1;
                //console.log('telefono e email cambiados');
            }
            if((phone.valido === 'true' && phone2.valido === 'true') && email2.valido === null){
                //Se cambia solo telefono
                try{
                    let response = await put(`admin/my_info`, {"phone": phone.campo});
                    await tellMeWhatsGoingOn("Se editó el teléfono correctamente");
                    history.push("/admin/home");
                    window.location.reload();

                    console.log({ response });
                } catch (error) {
                    tellMeWhatsGoingOn("Surgió un problema al editar el teléfono");
                    console.log({ error });
                }
                updated = 1;
                //console.log('telefono cambiado');
            }
            if(phone2.valido === null && (email.valido === 'true' && email2.valido === 'true')){
                //Se cambia solo correo
                try{
                    let response = await put(`admin/my_info`, {"email": email.campo});
                    await tellMeWhatsGoingOn("Se editó el correo correctamente");
                    history.push("/admin/home");
                    window.location.reload();

                    console.log({ response });
                } catch (error) {
                    tellMeWhatsGoingOn("Surgió un problema al editar el correo");
                    console.log({ error });
                }
                updated = 1;
                //console.log('email cambiado');
            }
            //Posible cambio en Contraseña
            if(password2.valido === 'true' && password.valido === 'true'){
                if(oldPassword.campo !== ''){
                    //Se cambia la contraseña
                    try{
                        let response = await put(`admin/user/password`, {"old_password": oldPassword.campo,
                                                                        "new_password1": password2.campo,
                                                                        "new_password2": password2.campo});
                        await tellMeWhatsGoingOn("Se editó la contraseña correctamente.");
                        history.push("/admin/home");
                        window.location.reload();

                        console.log({ response });
                        updated = 1;
                    } catch (error) {
                        tellMeWhatsGoingOn("La contraseña nueva no cumple con los requerimientos establecidos.");
                        console.log({ error });
                        updated = 0;
                    }
                    //console.log('contraseña cambiada');
                }else{
                    tellMeWhatsGoingOn("No olvides ingresar la antigua contraseña para continuar.");
                    updated = 0;
                }
            }else{
                changeValidForm(false);
            }
            //Mensaje de éxito y reinicio de inputs
            if(updated === 1){
                changeValidForm(true);
                changePhone({campo: '', valido: null}); changePhone2({campo: '', valido: null});
                changeEmail({campo: '', valido: null}); changeEmail2({campo: '', valido: null});
                changePassword({campo: '', valido: null}); changePassword2({campo: '', valido: null});
            }
        }else{
            changeValidForm(false);
        }

        if(phone2.valido === 'false' || email2.valido === 'false' || password2.valido === 'false'){
            changeValidForm(false);
        }
    }

    const tellMeWhatsGoingOn = async (message) => {
        const accept = await openAlert(message);
        if (accept) console.log("Accepted");
        else console.log("No accepted");
      };

    return(
        <AdminPage title="Inicio">
            <BreadCrum links={links} />
            <AdminTitle>Cambiar datos</AdminTitle>
            
            <br/>
            <FormS method="post" onSubmit={onSubmit}>
                
                <FInput
                    state = {phone}
                    changeState = {changePhone}
                    label = "Nuevo Teléfono"
                    type = "tel"
                    placeholder = "Nuevo número"
                    name = "phone"
                    errorMessage = "El teléfono debe tener 10 dígitos."
                    regularExpression = {expressions.phone}
                />
                <FInput
                    state = {phone2}
                    changeState = {changePhone2}
                    label = "Confirmar Nuevo Teléfono"
                    type = "tel"
                    placeholder = "Nuevo número"
                    name = "phone2"
                    errorMessage = "Ambos teléfonos deben ser iguales."
                    funcion={validarPhone2}
                />
                <FInput
                    state = {email}
                    changeState = {changeEmail}
                    label = "Nuevo Email"
                    type = "email"
                    placeholder = "nuevo@example.com"
                    name = "email"
                    errorMessage = "El correo solo puede contener letras, números, puntos, guiones y guion bajo."
                    regularExpression = {expressions.email}
                />
                <FInput
                    state = {email2}
                    changeState = {changeEmail2}
                    label = "Confirmar Nuevo Email"
                    type = "email"
                    placeholder = "nuevo@example.com"
                    name = "email2"
                    errorMessage = "Ambos correos deben ser iguales."
                    funcion={validarEmail2}
                />
                <FInput
                    state = {password}
                    changeState = {changePassword}
                    label = "Nueva Contraseña"
                    type = "password"
                    placeholder = "Nueva contraseña"
                    name = "password"
                    errorMessage = "La contraseña debe tener de 8 a 30 caracteres alfanuméricos."
                    regularExpression = {expressions.password}
                />
                <FInput
                    state = {password2}
                    changeState = {changePassword2}
                    label = "Confirmar Nueva Contraseña"
                    type = "password"
                    placeholder = "Nueva contraseña"
                    name = "password2"
                    errorMessage = "Ambas contraseñas deben ser iguales."
                    funcion={validarPassword2}
                />
                <FInput
                    state = {oldPassword}
                    changeState = {changeOldPassword}
                    label = "Contraseña Antigua"
                    type = "password"
                    placeholder = "Contraseña antigua"
                    name = "password2"
                    errorMessage = "Debe ingresar su antigua contraseña para poder cuardar los cambios."
                />

                {validForm === false && <FailedMessage>
                    <p>
                        <FontAwesomeIcon icon={faExclamationTriangle}/>
                        <b>Error:</b> Por favor, rellene el formulario correctamente.
                    </p>
                </FailedMessage>}
                <ButtonArea>
                    <Button type="sumbit">Guardar Cambios</Button>
                    {validForm === true && <SuccessMessage>¡Cambios guardados exitosamente!</SuccessMessage>}
                </ButtonArea>
            </FormS>

        </AdminPage>
    );
};

export default AdminData