import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col, Modal, Spinner, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './UserProf.css'

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({ username: "", email: "" });
    const navigate = useNavigate();

    const handleSessionTimeout = () => {
        toast.error("Session has expired. Please sign in again.");
        setTimeout(() => {
            localStorage.removeItem("access_token");
            navigate("/");
        }, 3000);
    };

const fetchUserProfile = async () => {
    try {
        // Fetch the user profile from the backend
        const response = await fetch("https://demo-project-backend-qrd8.onrender.com/api/users/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            setUser(data); // Store the user data in state
            setFormData({ username: data.username, email: data.email });

            // Fetch the user's artworks from the backend
            const artworkResponse = await fetch(
                `https://demo-project-backend-qrd8.onrender.com/api/users/${data.id}/artworks`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );

            if (artworkResponse.ok) {
                const artworkData = await artworkResponse.json();
                setArtworks(artworkData); // Store the artwork data in state
            } else if (artworkResponse.status === 401) {
                handleSessionTimeout(); // Handle session timeout (unauthorized)
            } else {
                toast.error("Failed to fetch artworks"); // Handle error fetching artworks
            }
        } else if (response.status === 401) {
            handleSessionTimeout(); // Handle session timeout (unauthorized)
        } else {
            toast.error("Failed to fetch user profile"); // Handle error fetching user profile
        }
        setLoading(false); // Stop loading indicator
    } catch (error) {
        toast.error("An error occurred while fetching the profile"); // Handle unexpected errors
        setLoading(false); // Stop loading indicator
    }
};

const handleEdit = () => {
    setEditing(true);
};

const handleSave = async () => {
    try {
        const currentUserId = user.id; // Assuming user ID is available in the state

        const response = await fetch(`https://demo-project-backend-qrd8.onrender.com/api/users/${currentUserId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify(formData), // Assuming formData contains updated user details
        });

        if (response.ok) {
            const updatedUser = await response.json();
            setUser(updatedUser); // Update user data in state
            toast.success("Profile updated successfully");
            setEditing(false);
        } else if (response.status === 401) {
            handleSessionTimeout(); // Handle unauthorized status
        } else {
            toast.error("Failed to update profile");
        }
    } catch (error) {
        console.error("Error:", error);
        toast.error("Network error while updating profile");
    }
};

const handleDelete = async () => {
    try {
        const currentUserId = user.id; // Assuming user ID is available in the state

        const response = await fetch(`https://demo-project-backend-qrd8.onrender.com/api/users/${currentUserId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });

        if (response.ok) {
            toast.success("Profile deleted successfully");
            localStorage.removeItem("access_token"); // Remove JWT token from localStorage
            navigate("/"); // Redirect to the homepage or login page
        } else if (response.status === 401) {
            handleSessionTimeout(); // Handle unauthorized status
        } else {
            toast.error("Failed to delete profile");
        }
    } catch (error) {
        console.error("Error:", error);
        toast.error("Network error while deleting profile");
    }
};


    useEffect(() => {
        fetchUserProfile();
    }, []);

    if (loading) {
        return <Spinner animation="border" variant="primary" />;
    }

    return (
        <Container className="mt-4 unbounded-uniquifier-p">
            {user && (
                <Card>
                    <Card.Body>
                        <h3>Profile</h3>
                        {editing ? (
                            <Form className="unbounded-uniquifier-p">
                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) =>
                                            setFormData({ ...formData, username: e.target.value })
                                        }
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                    />
                                </Form.Group>
                                <Button variant="success" onClick={handleSave} className="mt-2">
                                    Save
                                </Button>
                            </Form>
                        ) : (
                            <>
                                <p>Username: {user.username}</p>
                                <p>Email: {user.email}</p>
                                <Button variant="primary" onClick={handleEdit}>
                                    Edit Profile
                                </Button>
                            </>
                        )}<br />

                        <Button variant="danger" onClick={handleDelete} className="mt-3">
                            Delete Profile
                        </Button>
                    </Card.Body>
                </Card>
            )}

            <h3 className="mt-5">My Artworks</h3>
            <Row>
                {artworks.map((artwork) => (
                    <Col key={artwork.id} md={4} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={artwork.image_url} />
                            <Card.Body>
                                <Card.Title>{artwork.title}</Card.Title>
                                <Card.Text>{artwork.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default UserProfile;
