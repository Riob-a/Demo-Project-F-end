import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Col, Container, Row, Alert } from 'react-bootstrap';
import WOW from "wowjs";
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match');
            setShowAlert(true);
            setIsError(true);
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('https://demo-project-backend-ude8.onrender.com/api/users/change-password', {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify({ currentPassword, newPassword })
            });
            const result = await response.json();

            if (response.ok) {
                setMessage('Password changed successfully');
                setShowAlert(true);
                setIsError(false);

                setTimeout(() => {
                    setShowAlert(false);
                    navigate('/'); // Redirect to the home page
                }, 2000);
            } else {
                setMessage(result.message || 'Error changing password');
                setShowAlert(true);
                setIsError(true);
            }
        } catch {
            setMessage('An error occurred');
            setShowAlert(true);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        new WOW.WOW().init();
    }, []);

    return (
        <Container className="justify-content-center mb-5 mt-5">
            <Row className="justify-content-center text-center wow fadeInLeft" data-wow-delay="" data-wow-duration="1s">
                <h2 className='unbounded-uniquifier-header'>Change Password</h2>
            </Row>
            <Row className="justify-content-center mb-5">
                <Col xs={12} md={6} className="wow fadeInLeft mt-5" data-wow-duration="1s" data-wow-delay="0.2s">
                    <Card className="card-color" style={{ boxShadow: "0 0px 15px rgba(0, 0, 0, 0.5)" }}>
                        <Card.Body className="p-5">
                            <Card.Title className="contact-card mb-4 unbounded-uniquifier-h1">Change Password</Card.Title>

                            {showAlert && (
                                <Alert variant={isError ? "danger" : "success"} className="mt-3">
                                    {message}
                                </Alert>
                            )}

                            <Form onSubmit={handleChangePassword}>
                                <Form.Group controlId="currentPassword" className="mb-3">
                                    <Form.Label className='unbounded-uniquifier-h1'>Current Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your current password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="newPassword" className="mb-3">
                                    <Form.Label className='unbounded-uniquifier-h1'>New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="confirmPassword" className="mb-3">
                                    <Form.Label className='unbounded-uniquifier-h1'>Confirm New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm your new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="mt-3 unbounded-uniquifier-h1" disabled={isLoading}>
                                    {isLoading ? "Changing Password..." : "Change Password"}
                                </Button>
                                {!showAlert && <p className="mt-3">{message}</p>}
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ChangePassword;
