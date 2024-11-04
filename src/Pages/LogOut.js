import React, { useEffect, useState } from 'react';
import { Container, Row, Alert, Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import WOW from "wowjs";

function Logout() {
    const [message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            // Retrieve token from local storage
            const token = localStorage.getItem('access_token');

            // If token exists, make a logout request to the backend
            if (token) {
                try {
                    const response = await fetch('http://127.0.0.1:5000/api/logout', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                    });
                    const result = await response.json();

                    if (response.ok) {
                        setMessage(result.message || "You have been logged out.");
                    } else {
                        setMessage(result.message || "Failed to log out.");
                    }
                } catch (error) {
                    setMessage("An error occurred while logging out.");
                }
            } else {
                setMessage("No active session found.");
            }

            // Clear token from local storage
            localStorage.removeItem('access_token');

            // Hide the alert and navigate to the sign-in page after a delay
            setTimeout(() => {
                setShowAlert(false);
                navigate('/');
            }, 2000); // Redirect after 2 seconds
        };

        performLogout();
    }, [navigate]);

    useEffect(() => {
        new WOW.WOW().init();
    }, []);

    return (
        <Container className="justify-content-center p-5">
            <Col>
            <Row className="justify-content-center text-center">
                {showAlert && (
                    <Card className="mt-3 wow zoomIn" data-wow-duration="1s" style={{ width: '18rem' }}>
                        <Card.Body>
                            <Alert variant="info">
                                {message}
                            </Alert>
                        </Card.Body>
                    </Card>
                )}
            </Row>
            </Col>
        </Container>
    );
}

export default Logout;
