import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoginFulfilled } from "../../features/actions/loginActions";
import { Formik } from "formik";
import { Container, Row, Col, Image } from "react-bootstrap";
import Swal from "sweetalert2";

import foto from "../register/imagen/Foto3.jpg";
import "../register/css/Register.css";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const regexString = /[A-Z]+$/i;

  return (
    <Container fluid>
      <Row style={{ minHeight: "810px" }}>
        <Col
          xs={12}
          sm={6}
          className="d-flex flex-column justify-content-center"
        >
          <Container>
            <Row className="my-3">
              <Col className="register-wrapper" style={{ margin: "0" }}>
                <h5>Bienvenido</h5>
                <h3>Crea tu usuario!</h3>
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                  }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.firstName) {
                      errors.firstName = "ingresa tu nombre";
                    } else if (!regexString.test(values.firstName)) {
                      errors.firstName =
                        "solo tiene que ser letras y sin espacios";
                    }
                    if (!values.lastName) {
                      errors.lastName = "ingresa tu apellido";
                    } else if (!regexString.test(values.lastName)) {
                      errors.lastName =
                        "solo tiene que ser letras y sin espacios";
                    }
                    if (!values.email) {
                      errors.email = "Ingresa tu email";
                    } else if (!regexEmail.test(values.email)) {
                      errors.email = "el formato de email es incorrecto ";
                    }
                    if (!values.password) {
                      errors.password = "ingresa tu contraseña";
                    } else if (values.password.length < 6) {
                      errors.password =
                        " la contraseña debe tener al menos 6 caracteres";
                    }
                    let upper = 0;
                    let lower = 0;
                    values.password.split("").forEach((el) =>
                        (el === el.toLocaleLowerCase() && lower++) ||
                        (el === el.toUpperCase() && upper++)
                      );
                    if (upper === 0) {
                      errors.password = "minimo una mayuscula";
                    }
                    if (lower === 0) {
                      errors.password = "minimo una minuscula";
                    }
                    return errors;
                  }}
                  onSubmit={async (event) => {
                    const requestOptions = {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        "X-Api-Key": window.localStorage.getItem("token"),
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(event),
                    };

                    try {
                      const registerResponse = await fetch(
                        "https://ong-app-node.herokuapp.com/auth/register",
                        requestOptions
                      );
                      const data = await registerResponse.json();
                      console.log(data);

                      const loginResponse = await fetch(
                        process.env.REACT_APP_LOGIN_ENDPOINT,
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            email: event.email,
                            password: event.password,
                          }),
                        }
                      );
                      const loginData = await loginResponse.json();

                      dispatch(setLoginFulfilled(loginData.results));
                      navigate("/");
                    } catch (error) {
                      console.log( error);
                      return Swal.fire({
                        title: "Error!",
                        text: "El nombre y el apellido tiene que ser mayor de 4 caracteres",
                        type: "error",
                        confirmButtonText: "Continuar",
                      });
                    }
                  }}
                >
                  {({
                    values,
                    errors,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div>
                        <label htmlFor="firstName" className="formLabel">
                          Nombre
                        </label>
                        <input
                          className="formInput"
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={values.firstName}
                          onChange={handleChange}
                          placeholder="Nombre"
                        />
                      </div>
                      {errors.firstName && (
                        <p className="errorLabel">{errors.firstName}</p>
                      )}
                      <div>
                        <label htmlFor="lastName" className="formLabel">
                          Apellido{" "}
                        </label>
                        <input
                          className="formInput"
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur} // cuando clikeo afuera del input valida el campo
                          placeholder="Apellido"
                        />
                      </div>
                      {errors.lastName && (
                        <p className="errorLabel">{errors.lastName}</p>
                      )}
                      <div>
                        <label htmlFor="email" className="formLabel">
                          Email{" "}
                        </label>
                        <input
                          className="formInput"
                          type="email"
                          id="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          placeholder="Email"
                        />
                      </div>
                      {errors.email && (
                        <p className="errorLabel">{errors.email}</p>
                      )}
                      <div>
                        <label htmlFor="password" className="formLabel">
                          Contraseña{" "}
                        </label>
                        <input
                          className="formInput"
                          type="password"
                          id="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          placeholder="Contraseña"
                        />
                      </div>
                      {errors.password && (
                        <p className="errorLabel">{errors.password}</p>
                      )}
                      <button type="submit" className="buttonCreate">
                        Crear usuario
                      </button>
                    </form>
                  )}
                </Formik>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col xs={12} sm={6} style={{ padding: "0" }}>
          <Image src={foto} className="register-image"></Image>
        </Col>
      </Row>
    </Container>
  );
}
