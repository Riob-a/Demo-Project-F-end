import React, { useEffect, useState } from 'react';
import { Container, Row, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const [message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Perform logout
        localStorage.removeItem('access_token');
        setMessage("You have been logged out.");
        
        // Hide the alert and navigate to sign-in page after a delay
        setTimeout(() => {
            setShowAlert(false);
            navigate('/');
        }, 2000); // Redirect after 2 seconds
    }, [navigate]);

    return (
        <Container className="justify-content-center mb-5 mt-5">
            <Row className="justify-content-center text-center">
                {showAlert && (
                    <Alert variant="info" className="mt-3">
                        {message}
                    </Alert>
                )}
            </Row>
        </Container>
    );
}

export default Logout;
