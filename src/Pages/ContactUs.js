import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { ThemeContext } from "../Components/ThemeContext";
import WOW from "wowjs";
import "./Contact Me.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  // const nameInputRef = useRef(null);

  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("access_token")

    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await fetch('https://demo-project-backend-qrd8.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.status === 401) {
        // Handle session timeout
        setResponseMessage('Session expired. Please log in again.');
        localStorage.removeItem("access_token"); // Clear token
        setTimeout(() => {
          window.location.href = "/signin"; // Redirect to login page
        }, 2000);
      } else if (response.ok) {
        const result = await response.json();
        setResponseMessage('Thank you for reaching out! Your message has been submitted.');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        const errorData = await response.json();
        setResponseMessage(errorData.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setResponseMessage('Failed to submit. Please try again later.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div className="header-contact text-center mb-4 wow fadeInDown" data-wow-duration="0.8s" style={{ boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)" }}>
        <h1 className="display-4 unbounded-uniquifier-h1 text-white">Get in Touch</h1>
        <p className="lead unbounded-uniquifier-header text-white">
          <a href='/home' style={{ color: "#EA8E1D" }}>HomePage</a>
        </p>
      </div>

      {/* Floating Theme Toggle Button */}
            <Button
              className="floating-theme-button"
              onClick={toggleTheme}
              variant={theme === "light" ? "dark" : "light"}
            >
              {theme === "light" ? <MdOutlineDarkMode size={24} /> : <MdOutlineLightMode size={24} />}
            </Button>

      <Container className='justify-content-center mb-5'>
        <Row className="gy-5 justify-content-center">
          <div className="text-center mx-auto mb-5 p-2 wow fadeInUp  " data-wow-delay="0.1s" style={{ width: "600px" }}>
            <h5 className="text-white text-uppercase unbounded-uniquifier-header mt-5" style={{ spacing: "5px" }}><u>Contact Us</u></h5>
            <p className="lead unbounded-uniquifier-p1 text-white">We'd love to hear from you! Whether you have a question or just want to say hello, our team is here to help.</p>
          </div>
          
          <Col xs={12} md={6}>
            <div className="wow fadeInLeft" data-wow-duration="1s">
              <Card className="mx-auto" style={{ boxShadow: "0 0px 15px rgba(0, 0, 0, 0.5)" }} border="" bg=''>
                <Card.Body className="p-5">
                  <Card.Title className="contact-card mb-4 unbounded-uniquifier-header">Contact Me</Card.Title>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName" className="mb-3">
                      <Form.Label className='unbounded-uniquifier-header'>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formEmail" className="mb-3">
                      <Form.Label className='unbounded-uniquifier-header'>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formMessage" className="mb-3">
                      <Form.Label className='unbounded-uniquifier-header'>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Write your message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Button variant="primary unbounded-uniquifier-header" type="submit" disabled={loading}>
                      {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
                    </Button>
                  </Form>
                  {responseMessage && (
                    <div className={`mt-3 ${responseMessage.includes('Thank you') ? 'text-success' : 'text-danger'}`}>
                      {responseMessage}
                    </div>
                  )}
                </Card.Body>
              </Card>
            </div>
          </Col>

          {/* Contact Info inside a Card */}
          <Col xs={12} md={4}>
            <div className="wow fadeInRight" data-wow-duration="1s">
              <Card className="card-color text-white" style={{ boxShadow: "0 0px 15px rgba(0, 0, 0, 0.5)" }} border="" bg=''>
                <Card.Body className="py-5">
                  <section className="text-center">
                    <Card.Title className='contact-card unbounded-uniquifier-header'><u>Our Office</u></Card.Title>
                    <p>
                      <FaMapMarkerAlt className="me-2 unbounded-uniquifier-header" /> 123 Street, Nairobi, Kenya
                    </p>

                    <Card.Title className='contact-card unbounded-uniquifier-header'><u>Email Us</u></Card.Title>
                    <p>
                      <FaEnvelope className="me-2" /> info@RRICKS.com
                    </p>

                    <Card.Title className='contact-card unbounded-uniquifier-header'><u>Call Us</u></Card.Title>
                    <p>
                      <FaPhoneAlt className="me-2" /> +1233567890
                    </p>
                  </section>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactForm;
/* {responseMessage && <p className="mt-3 text-success">{responseMessage}</p>} */
/* setResponseMessage(result.message); */

