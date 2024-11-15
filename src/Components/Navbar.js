import React from 'react';
import { Container, Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import logo from '../Img/pointed fingure.gif';
import "./Components.css";

function BasicExample() {
  return (
    <Navbar expand="lg" bg='dark' data-bs-theme="dark" className=''>
      <Container>
        <Navbar.Brand as={NavLink} to="/home" className="Navbar-header">
          <Image roundedCircle alt='logo' src={logo} width="30" height="30" className='d-inline-block align-top' />
          {' '}D3-<b> RRICKS</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="brand" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/home" activeClassName="active" className="brand">Home | </Nav.Link>
            <Nav.Link as={NavLink} to="/reference" activeClassName="active" className="brand">Reference | </Nav.Link>
            <Nav.Link as={NavLink} to="/artwork" activeClassName="active" className="brand">ARt | </Nav.Link>
            <Nav.Link as={NavLink} to="/register" activeClassName="active" className="brand">Register |</Nav.Link>
            {/* <Nav.Link as={NavLink} to="/" className="brand">Sign-in |</Nav.Link> */}
            <Nav.Link as={NavLink} to="/logout"activeClassName="active"  className="brand">Log Out</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown" className="brand">
              <NavDropdown.Item as={NavLink} to="/artwork" activeClassName="active" className="brand">ARt</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/contact" activeClassName="active" className="brand">Contact Us</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/about" activeClassName="active" className="brand">About</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://automated-donation-platform-front-end.vercel.app/">
                Fund.Girls
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
