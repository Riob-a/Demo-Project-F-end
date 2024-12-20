import React, { useEffect, useState } from 'react';
import { Container, Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import logo from '../Img/pointed fingure.gif';
import { useNavigate } from "react-router-dom";
import "./Components.css";
import { toast } from 'react-toastify';

function BasicExample() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("https://demo-project-backend-qrd8.onrender.com/api/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else if (response.status === 401) {
        handleSessionTimeout();
      } else {
        toast.error("Failed to fetch user profile");
      }
    } catch (error) {
      toast.error("An error occurred while fetching the profile");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleSessionTimeout = () => {
    toast.error("Session expired. Please log in again.");
    setTimeout(() => {
      localStorage.removeItem("access_token");
      navigate("/signin");
    }, 3000);
  };

  return (
    <Navbar expand="lg" bg="" data-bs-theme="">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="Navbar-header">
          <Image
            roundedCircle
            alt="logo"
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          D3 +<b> RRICKS</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="brand" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" className="brand">Home | </Nav.Link>
            {user ? (
            <Nav.Link as={NavLink} to="/artwork" className="brand">ARt | </Nav.Link>
            ) : (
              <Nav.Link
               onClick={() => {
                toast.info("Please sign in to view artworks.");
                navigate("/signin")
               }}
               className='brand'
               >
                ARt |
               </Nav.Link>
            )}
            <NavDropdown title="Dropdown" id="basic-nav-dropdown" className="brand">
              {user ? (
                <NavDropdown.Item as={NavLink} to="/contact" className="brand">Contact Us</NavDropdown.Item>
              ) : (
                <NavDropdown.Item
                onClick={() => {
                  toast.info("Please sig in to contact us.");
                  navigate("/signin");
                }}
                className='brand'
                >
                  Contact Us
                </NavDropdown.Item>
              )}
              <NavDropdown.Item as={NavLink} to="/about" className="brand">About</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://automated-donation-platform-front-end.vercel.app/">
                Fund.Girls
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          
          <Nav className="ml-auto">
            {!user ? (
              // Unauthenticated user links
              <>
                <Nav.Link as={NavLink} to="/signin" className="brand2">Sign-in |</Nav.Link>
                <Nav.Link as={NavLink} to="/register" className="brand2">Register |</Nav.Link>
              </>
            ) : (
              // Authenticated user links
              <>
                <Nav.Link as={NavLink} to="/profile" className="brand2">
                  <Image
                    src={user.profile_image || "https://via.placeholder.com/30"}
                    alt="Profile"
                    roundedCircle
                    width="30"
                    height="30"
                    className="d-inline-block align-top me-2"
                  />
                  {user.username} |
                </Nav.Link>
                <Nav.Link as={NavLink} to="/logout" className="brand2">Log Out</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
