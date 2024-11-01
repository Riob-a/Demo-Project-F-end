// Register.js
import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Col, Container, Row } from 'react-bootstrap';
import WOW from "wowjs";


function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });
            const result = await response.json();
            setMessage(response.ok ? 'User registered successfully' : result.message || 'Error registering user');
        } catch {
            setMessage('An error occurred');
        }
    };

    useEffect(() => {
        new WOW.WOW().init();
      }, [])

    return (
        <Container  className="justify-content-center mb-5 mt-5">
            <Row className="justify-content-center mb-5 mt-5">
            <Col xs={12} md={6} className="wow fadeInLeft mt-5" data-wow-duration="1s">
            <Card className="card-color text-white" style={{ boxShadow: "0 0px 15px rgba(0, 0, 0, 0.5)" }}>
                <Card.Body className="p-5">
                    <Card.Title className="contact-card mb-4 unbounded-uniquifier-h1">Register</Card.Title>
                    <Form onSubmit={handleRegister}>
                        <Form.Group controlId="username" className="mb-3">
                            <Form.Label className='unbounded-uniquifier-h1'>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label className='unbounded-uniquifier-h1'>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="password" className="mb-3">
                            <Form.Label className='unbounded-uniquifier-h1'>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3 unbounded-uniquifier-h1">
                            Register
                        </Button>
                        <p className="mt-3">{message}</p>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
        </Row>
        </Container>
    );
}

export default Register;