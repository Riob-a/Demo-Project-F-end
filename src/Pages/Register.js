//  https://demo-project-backend-bl40.onrender.com
import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Col, Container, Row, Alert } from 'react-bootstrap';
import WOW from "wowjs";
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null); // State for profile image
    const [message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Use FormData to include the profile image in the request
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        if (profileImage) {
            formData.append('profile_image', profileImage); // Add the profile image
        }

        try {
            const response = await fetch('https://demo-project-backend-production.up.railway.app/api/register', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            if (response.ok) {
                setMessage('User registered successfully');
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                    navigate('/signin');
                }, 2000);
            } else {
                setMessage(result.message || 'Error registering user');
                setShowAlert(false);
            }
        } catch {
            setMessage('An error occurred');
            setShowAlert(false);
        }
    };

    useEffect(() => {
        new WOW.WOW().init();
    }, []);

    return (
        <Container className="justify-content-center mb-2 mt-5">
            <Row className="justify-content-center text-center wow fadeInLeft" data-wow-delay="" data-wow-duration="1s">
                <h2 className='unbounded-uniquifier-header'>Register an Account</h2>
            </Row>
            <Row className="justify-content-center mb-5 mt-2">
                <Col xs={12} md={6} className="wow fadeInLeft mt-5" data-wow-duration="1s" data-wow-delay="0.4s">
                    <Card className="rounded-5" style={{ boxShadow: "0 0px 15px rgba(0, 0, 0, 0.5)" }}>
                        <Card.Body className="p-5">
                            <Card.Title className="contact-card mb-4 unbounded-uniquifier-h1">Register</Card.Title>

                            {showAlert && (
                                <Alert variant="success" className="mt-3">
                                    {message}
                                </Alert>
                            )}

                            <Form onSubmit={handleRegister} encType="multipart/form-data">
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
                                <Form.Group controlId="profileImage" className="mb-3">
                                    <Form.Label className='unbounded-uniquifier-h1'>Profile Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setProfileImage(e.target.files[0])} // Handle file input
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="mt-3 unbounded-uniquifier-h1">
                                    Register
                                </Button>
                                {!showAlert && <p className="mt-3">{message}</p>}
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="justify-content-center text-center wow fadeInLeft" data-wow-delay="0.4s" data-wow-duration="1s">
                <p className="unbounded-uniquifier-header">Check Spam for confirmation email</p>
            </Row>
        </Container>
    );
}

export default Register;
