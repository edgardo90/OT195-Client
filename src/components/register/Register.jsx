import React from "react";
import { Formik } from "formik";
import useFetch  from "../../hooks/useFetch";
import Header from "../Header";

import {Container, Row, Col, Image} from 'react-bootstrap'


import foto from "../register/imagen/Foto3.jpg"
import  "../register/css/Register.css"


export default function Register(){

    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i; 
    const regexString = /[A-Z]+$/i  ; 

    return(
        <div  >
            <Header/>
            <img className={style.imagen} src={foto}  alt="imagen.." /> 
            <h1 className={style.welcome} >Bienvenido</h1>
            <h1 className={style.create} >Crea tu usuario!</h1>
            <Formik

              initialValues={{
                   firstName:"",
                   lastName:"",
                   email:"",
                   password:"",
                  }}
              validate={(values)=>{
                const errors = {};
                  if(!values.firstName  ){
                      errors.firstName = "ingresa tu nombre";
                  }else if( !regexString.test(values.firstName) ){
                      errors.firstName = "solo tiene que ser letras y sin espacios"
                  }
                  if(!values.lastName){
                      errors.lastName = "ingresa tu apellido";
                  } else if(!regexString.test(values.lastName) ){
                      errors.lastName = "solo tiene que ser letras y sin espacios"
                  }
                  if(!values.email){
                      errors.email = "Ingresa tu email";
                  }else if(!regexEmail.test(values.email)){
                      errors.email = "el formato de email es incorrecto "
                  }
                  if(!values.password){
                      errors.password = "ingresa tu contraseña"
                  } else if(values.password.length < 6 ){
                      errors.password = " la contraseña debe tener al menos 6 caracteres"
                  }
                  return errors
              }}
              onSubmit={(event) =>{

                let requestOptions = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(event),
                    redirect: 'follow'
                };

                fetch("http://127.0.0.1:3001/auth/register", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
                
            
            }}
            >
                {( {values,errors , handleChange, handleBlur, handleSubmit } )=>(
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="firstName" className="formLabel" >Nombre</label>
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
                        { errors.firstName && <p className="errorLabel" >{errors.firstName}</p>}
                        <div>
                            <label htmlFor="lastName" className="formLabel" >Apellido </label>
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
                        { errors.lastName && <p className="errorLabel" >{errors.lastName}</p>}
                        <div>
                            <label htmlFor="email" className="formLabel" >Email </label>
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
                        { errors.email && <p className="errorLabel">{errors.email}</p>}
                        <div>
                            <label htmlFor="password" className="formLabel" >Contraseña </label>
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
                        { errors.password && <p className="errorLabel" >{errors.password}</p>}
                        <button type="submit" className="buttonCreate" >Crear usuario</button>
                    </form>
                ) }
            </Formik>

                        </Col>
                    </Row>
                </Container>
                </Col>
                <Col xxl={6}>
                <Image className="register-image"src={foto}></Image>
                </Col>
            </Row>
        </Container>
    )
}