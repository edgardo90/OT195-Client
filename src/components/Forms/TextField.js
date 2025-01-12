import React from "react";
import { Form, Col, Row } from "react-bootstrap";

import { useField } from "formik";

const TextField = ({
  label,
  type = "text",
  min,
  max,
  placeholder,
  accept = "",
  disabled = false,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <Form.Group className="mb-3 fieldContainer" as={Row}>
      <Col sm="2" className="fieldLabel">
        <Form.Label style={{ marginRight:"100px" }}>{label}</Form.Label>
      </Col>
      <Col sm="10" className="fieldControl">
        <Form.Control
          {...field}
          disabled={disabled}
          type={type}
          min={min}
          max={max}
          accept={accept}
          placeholder={placeholder}
        ></Form.Control>
        {meta.touched && meta.error ? <h6>{meta.error}</h6> : null}
      </Col>
    </Form.Group>
  );
};

export default TextField;
