import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col, Spinner, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import WOW from "wowjs";
import "./UserProf.css";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({ username: "", email: "", profile_image: null });
    const navigate = useNavigate();

    useEffect(() => {
        const wowInstance = new WOW.WOW();
        wowInstance.init();
    }, []);

    const handleSessionTimeout = () => {
        toast.error("Session has expired. Please sign in again.");
        setTimeout(() => {
            localStorage.removeItem("access_token");
            navigate("/");
        }, 3000);
    };

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
                setFormData({ username: data.username, email: data.email, profile_image: null });

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
                    setArtworks(artworkData);
                } else if (artworkResponse.status === 401) {
                    handleSessionTimeout();
                } else {
                    toast.error("Failed to fetch artworks");
                }
            } else if (response.status === 401) {
                handleSessionTimeout();
            } else {
                toast.error("Failed to fetch user profile");
            }
            setLoading(false);
        } catch (error) {
            toast.error("An error occurred while fetching the profile");
            setLoading(false);
        }
    };

    const handleEdit = () => {
        setEditing(true);
    };

    // const handleFileChange = (e) => {
    //     setFormData({ ...formData, profile_image: e.target.files[0] });
    // };

    const handleSave = async () => {
        try {
            const currentUserId = user.id;
    
            // Create a FormData object for file upload
            const formDataObj = new FormData();
            formDataObj.append("username", formData.username);
            formDataObj.append("email", formData.email);
    
            // Check if the user uploaded a new profile image
            if (formData.profile_image) {
                formDataObj.append("profile_image", formData.profile_image);
            }
    
            const response = await fetch(`https://demo-project-backend-qrd8.onrender.com/api/users/${currentUserId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                body: formDataObj, // Send the FormData object
            });
    
            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser); // Update the user state
                toast.success("Profile updated successfully");
                setEditing(false);
                window.location.reload();
            } else if (response.status === 401) {
                handleSessionTimeout();
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
            const currentUserId = user.id;
            const response = await fetch(`https://demo-project-backend-qrd8.onrender.com/api/users/${currentUserId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });

            if (response.ok) {
                toast.success("Profile deleted successfully");
                localStorage.removeItem("access_token");
                navigate("/");
            } else if (response.status === 401) {
                handleSessionTimeout();
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
        return <Spinner animation="border" variant="white" className="d-block mx-auto mt-5" />;
    }

    return (
        <Container className="mt-4 mb-4 unbounded-uniquifier-p">
            {user && (
                <Card className="wow fadeInLeft" data-wow-delay="0.2s">
                    <Card.Body>
                        <h3>Profile</h3>
                        <hr />
                        <div className="text-center">
                            {user.profile_image ? (
                                <img
                                    src={user.profile_image}
                                    alt="Profile"
                                    className="profile-image"
                                    style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                                />
                            ) : (
                                <div>No Profile Image</div>
                            )}
                        </div>
                        {editing ? (
                            <Form>
                                <Form.Group className="m-2">
                                    <Form.Label><b>Username</b></Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group className="m-2">
                                    <Form.Label><b>Email</b></Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group className="m-2">
                                    <Form.Label><b>Profile Image</b></Form.Label>
                                    <Form.Control type="file" onChange={(e) => setFormData({ ...formData, profile_image: e.target.files[0] })} />
                                </Form.Group>

                                <Button variant="success" onClick={handleSave} className="mt-2 me-2 mb-3">
                                    Save
                                </Button>

                                <Button variant="secondary" onClick={() => setEditing(false)} className="mt-2 mb-3">
                                    Back
                                </Button>
                            </Form>
                        ) : (
                            <>
                                <p>
                                    <b>Username:</b> {user.username}
                                </p>
                                <p>
                                    <b>Email:</b> {user.email}
                                </p>
                                <p>
                                    <b>Created:</b> {user.created_at}
                                </p>
                                <hr />
                                <Button variant="primary" onClick={handleEdit} className="me-2 mt-2 mb-3">
                                    Edit Profile
                                </Button>
                            </>
                        )}

                        <Button variant="danger" onClick={handleDelete} className="mt-2 mb-3">
                            Delete Profile
                        </Button>
                    </Card.Body>
                </Card>
            )}

            <h1 className="mt-5 mb-4 wow fadeInLeft" data-wow-delay="0.4s">
                My Artwork
            </h1>
            <Row className="wow fadeInLeft" data-wow-delay="0.8s">
                {artworks.map((artwork) => (
                    <Col key={artwork.id} md={4} className="mb-4">
                        <Card className="profile-card">
                            <Card.Img variant="top" src={artwork.image_url} loading="lazy" />
                            <Card.Body>
                                <Card.Title>{artwork.name}</Card.Title>
                                <Card.Text className="text-2 text-muted">{artwork.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default UserProfile;
