import React, { useRef, useContext, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { authContext } from "../context/auth";
import { Redirect } from "react-router-dom";

export default function Auth() {
  return (
    <div style={styles.innerContainer}>
      <Row>
        <Login />
        <Register />
      </Row>
    </div>
  );
}
function Login() {
  const emailRef = useRef();
  const passRef = useRef();
  const { setLogin } = useContext(authContext);
  const { islogged } = useContext(authContext) || false;

  return (
    <Col
      sm={{ span: 8, offset: 2 }}
      md={{ span: 4, offset: 2 }}
      className="justify-content-md-center"
    >
      {islogged ? <Redirect to="/dashboard" /> : null}
      <div style={styles.loginbox}>
        <h1>Login</h1>

        <Form>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="text-light">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={emailRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label className="text-light">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={passRef}
            />
          </Form.Group>
          <Button
            variant="warning"
            onClick={(e) => setLogin(e, emailRef, passRef)}
          >
            Login
          </Button>
        </Form>
      </div>
    </Col>
  );
}
function Register() {
  const emailRef = useRef();
  const passRef = useRef();
  const { setRegister, message } = useContext(authContext);

  return (
    <Col
      xs={{ span: 8, offset: 2 }}
      md={{ span: 4, offset: 0 }}
      className="justify-content-md-center"
    >
      <div style={styles.regbox}>
        <h1>Register</h1>
        {message !== "" ? <Alert variant="primary">{message}</Alert> : null}
        <Form>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={emailRef}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={passRef}
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={(e) => setRegister(e, emailRef, passRef)}
          >
            Register
          </Button>
        </Form>
      </div>
    </Col>
  );
}
const styles = {
  innerContainer: {
    width: "100%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  loginbox: {
    backgroundColor: "#39A2DB",
    padding: "15px",
    borderRadius: "5px",
  },
  regbox: {
    backgroundColor: "#FFC947",
    padding: "15px",
    borderRadius: "5px",
  },
};
