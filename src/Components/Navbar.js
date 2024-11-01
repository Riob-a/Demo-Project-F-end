import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from '../Img/pointed fingure.gif';
import "./Components.css";
import WOW from "wowjs";

function BasicExample() {
  // State to track the active link
  const [activeKey, setActiveKey] = useState(window.location.pathname);

  // Update active link based on navigation
  useEffect(() => {
    const handleLocationChange = () => {
      setActiveKey(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  return (
    <Navbar expand="lg" bg='dark' data-bs-theme="dark" className=''>
      <Container>
        <Navbar.Brand href="/" className="Navbar-header">
          <Image roundedCircle alt='logo' src={logo} width="30" height="30" className='d-inline-block align-top' />
          {' '}D3-<b> RRICKS</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="brand" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" activeKey={activeKey} onSelect={(selectedKey) => setActiveKey(selectedKey)}>
            <Nav.Link href="/" className={`brand ${activeKey === '/' ? 'active' : ''}`}>Home |</Nav.Link>
            <Nav.Link href="/reference" className={`brand ${activeKey === '/reference' ? 'active' : ''}`}>Reference | </Nav.Link>
            <Nav.Link href="/artwork" className={`brand ${activeKey === '/artwork' ? 'active' : ''}`}>ARt | </Nav.Link>
            <Nav.Link href="/register" className={`brand ${activeKey === '/register' ? 'active' : ''}`}>Register |</Nav.Link>
            <Nav.Link href="/sign-in" className={`brand ${activeKey === '/sign-in' ? 'active' : ''}`}>Sign-in |</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown" className="brand">
              <NavDropdown.Item href="/artwork" className={activeKey === '/artwork' ? 'brand' : ''}>ARt</NavDropdown.Item>
              <NavDropdown.Item href="/contact" className={activeKey === '/contact' ? 'brand' : ''}>Contact Us</NavDropdown.Item>
              <NavDropdown.Item href="/about" className={activeKey === '/about' ? 'brand' : ''}>About</NavDropdown.Item>
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
