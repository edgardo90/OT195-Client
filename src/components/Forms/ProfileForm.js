import * as Bootstrap from "react-bootstrap";
import { Formik, Form } from "formik";
import TextField from "../Forms/TextField";
import Button from "../Button";
import Select from "./Select";
import { useSelector } from "react-redux";
//
import Swal from "sweetalert2";

const ProfileForm = ({ setEditView, userData, formMethod }) => { // trsigo lo que esta dentro ({ })  de ProfileEdit.jsx
  // const user = useSelector(({ user }) => user.entity);
  // console.log(formMethod)
  // console.log(userData)

  return (
    <Formik
      initialValues={{
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        roleId: userData.roleId,
      }}
      onSubmit={(values) => formMethod(values)}
    >
      <Bootstrap.Form as={Form}>
        <TextField name="firstName" label="Nombre"></TextField>
        <TextField name="lastName" label="Apellido"></TextField>
        <TextField name="email" label="Email" type="email"></TextField>
        {userData.roleId !== 1 ? null : (
          <Select name="roleId" label="Rol">
            <option value="1">Admin</option>
            <option value="2">User</option>
          </Select>
        )}
        <Button styles="primary" type="submit">
          Guardar
        </Button>
        {setEditView ? (
          <Button styles="secondary" callbackClick={() => setEditView(false)}>
            Cancelar
          </Button>
        ) : null}
      </Bootstrap.Form>
    </Formik>
  );
};
export default ProfileForm;
