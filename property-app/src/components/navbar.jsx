import React, { useRef, useContext, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { authContext } from "../context/auth";

export default function NavComponent() {
  const { setLogout } = useContext(authContext);
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/dashboard">Sales Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/ads">Ads Management</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <a href="/" onClick={() => setLogout()}>
                Logout
              </a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
