import React, { useState, useEffect, useContext } from "react";
import { Card, Button, Container, Row, Col, Spinner, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { ThemeContext } from "../Components/ThemeContext";
import WOW from "wowjs";
import "./UserProf.css";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [artworks, setArtworks] = useState([]);
    const [contacts, setContacts] = useState([]); 
    const [likedArtworks, setLikedArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const [formData, setFormData] = useState({ username: "", email: "", profile_image: null });
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    useEffect(() => {
        const wowInstance = new WOW.WOW();
        wowInstance.init();
    }, []);

    const handleSessionTimeout = () => {
        toast.error("Session has expired. Please sign in again.");
        setTimeout(() => {
            localStorage.removeItem("access_token");
            navigate("/signin");
        }, 3000);
    };

    const fetchUserProfile = async () => {
        try {
            const response = await fetch("https://demo-project-backend-jj40.onrender.com/api/users/me", {
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
                    `https://demo-project-backend-jj40.onrender.com/api/users/${data.id}/artworks`,
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
                    toast.error("Oops, couldn't get your artworks");
                }
    
                // Fetch user's contacts using the new route
                fetchUserContacts();
            } else if (response.status === 401) {
                handleSessionTimeout();
            } else {
                toast.error("Oops, couldn't get your user profile");
            }
            setLoading(false);
        } catch (error) {
            toast.error("An error occurred while fetching the profile");
            setLoading(false);
        }
    };

    const fetchLikedArtworks = async () => {
        try {
            const response = await fetch("https://demo-project-backend-jj40.onrender.com/api/users/me/liked-artworks", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                setLikedArtworks(data);
            } else if (response.status === 401) {
                handleSessionTimeout();
            } else {
                toast.error("Failed to fetch liked artworks");
            }
        } catch (error) {
            toast.error("Network error while fetching liked artworks");
        }
    };
    
    useEffect(() => {
        // fetchUserProfile();
        fetchLikedArtworks(); // Fetch liked artworks
    }, []);
    
    const fetchUserContacts = async () => {
        try {
            const response = await fetch("https://demo-project-backend-jj40.onrender.com/api/users/me/contacts", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
    
            if (response.ok) {
                const contactsData = await response.json();
                setContacts(contactsData);
            } else if (response.status === 401) {
                handleSessionTimeout();
            } else {
                toast.error("Oops, couldn't get your messages");
            }
        } catch (error) {
            toast.error("Network error while fetching contacts");
        }
    };
    

    const handleEdit = () => {
        setEditing(true);
    };

    const handleChangePassword = () => {
        setChangingPassword(true);
    };

    const handleSavePassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }

        try {
            const response = await fetch("https://demo-project-backend-jj40.onrender.com/api/users/change-password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                body: JSON.stringify({
                    old_password: passwordData.oldPassword,
                    new_password: passwordData.newPassword,
                }),
            });

            if (response.ok) {
                toast.success("Password changed successfully");
                setChangingPassword(false);
                setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
            } else if (response.status === 401) {
                handleSessionTimeout();
            } else {
                toast.error("Failed to change password");
            }
        } catch (error) {
            toast.error("Network error while changing password");
        }
    };


    const handleSave = async () => {
        try {
            const currentUserId = user.id;

            const formDataObj = new FormData();
            formDataObj.append("username", formData.username);
            formDataObj.append("email", formData.email);

            if (formData.profile_image) {
                formDataObj.append("profile_image", formData.profile_image);
            }

            const response = await fetch(`https://demo-project-backend-jj40.onrender.com/api/users/${currentUserId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                body: formDataObj,
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser);
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
            const response = await fetch(`https://demo-project-backend-jj40.onrender.com/api/users/${currentUserId}`, {
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
        return <Spinner animation="border" variant="white" className="d-block mx-auto mt-5 mb-5 " />;
    }

    return (
        <Container className="mt-4 mb-4 unbounded-uniquifier-p">
            {/* Floating Theme Toggle Button */}
                  <Button
                    className="floating-theme-button"
                    onClick={toggleTheme}
                    variant={theme === "light" ? "dark" : "light"}
                  >
                    {theme === "light" ? <MdOutlineDarkMode size={24} /> : <MdOutlineLightMode size={24} />}
                  </Button>

            {user && (
                <Card className="wow fadeInLeft" data-wow-delay="0.2s">
                    <Card.Body>
                        <h3>Profile</h3>
                        <hr />
                        <div className="text-center m-4">
                            {user.profile_image ? (
                                <img
                                    src={user.profile_image}
                                    alt="Profile"
                                    className="profile-image"
                                    style={{ width: "200px", height: "200px", borderRadius: "50%" }}
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
                                <hr />
                                <div className="float-start">
                                <Button variant="primary" onClick={handleSave} className="mt-2 me-4 mb-3 rounded-5 prof-button">
                                    Save
                                </Button>

                                <Button variant="secondary" onClick={() => setEditing(false)} className="mt-2 mb-3 rounded-5 prof-button">
                                    Back
                                </Button>
                                </div>
                            </Form>
                        ) : changingPassword ? (
                            <Form className="m-2">
                                <Form.Group className="m-2">
                                    <Form.Label><b>Current Password</b></Form.Label>
                                    <Form.Control 
                                       type="password"
                                       value={passwordData.oldPassword}
                                       onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="m-2">
                                    <Form.Label><b>New Password</b></Form.Label>
                                    <Form.Control 
                                       type="password"
                                       value={passwordData.newPassword}
                                       onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="m-2">
                                    <Form.Label><b>Confirm New Password</b></Form.Label>
                                    <Form.Control 
                                       type="password"
                                       value={passwordData.confirmPassword}
                                       onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value })}
                                    />
                                </Form.Group>
                                <hr />
                                <Button variant="" onClick={handleSavePassword} className="mt-2 me-2 mb-3 rounded-5 prof-button">Save Password</Button>
                                <Button variant="" onClick={() => setChangingPassword(false)} className="mt-2 mb-3 rounded-5 prof-button">Cancel</Button>
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
                                <Button variant="primary" onClick={handleEdit} className="me-2 mt-2 mb-3 justify-content-center rounded-5 prof-button">
                                    Edit Profile
                                </Button>
                                <Button variant="secondary" onClick={handleChangePassword} className="me-2 mt-2 mb-3 rounded-5 prof-button">
                                    Change Password
                                </Button>
                            </>
                        )}
                        <div className="float-end">
                        <Button variant="danger" onClick={handleDelete} className="mt-2 mb-3 rounded-5 prof-delbutton">
                            Delete Profile
                        </Button>
                        </div>
                    </Card.Body>
                </Card>
            )}

            <h1 className="mt-5 mb-4 wow fadeInLeft" data-wow-delay="0.4s">
                My Artwork
                <hr />
            </h1>
            
            <Row className="wow fadeInLeft" data-wow-delay="0.8s">
                {artworks.map((artwork) => (
                    <Col key={artwork.id} md={4} className="mb-4">
                        <Card className="profile-card">
                            <Card.Img variant="top" src={artwork.image_url} loading="lazy" />
                            <Card.Body>
                                <Card.Title>{artwork.name}</Card.Title>
                                <Card.Text className="text-2">{artwork.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <h1 className="mt-5 mb-4 wow fadeInLeft" data-wow-delay="0.4s">
                My Messages
                <hr />
            </h1>
            <Row className="wow fadeInLeft" data-wow-delay="0.8s">
                {contacts.map((contact) => (
                    <Col key={contact.id} md={6} className="mb-4">
                        <Card className="profile-card">
                            <Card.Body>
                                <Card.Title>{contact.name}</Card.Title>
                                {/* <Card.Text><b>Email:</b> {contact.email}</Card.Text> */}
                                <Card.Text><b>Message:</b> {contact.message}</Card.Text>
                                <Card.Text><b>Posted At:</b> {contact.posted_at}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

           <h1 className="mt-5 mb-4 wow fadeInLeft" data-wow-delay="0.4s">
            Liked Artworks
            <hr />
           </h1>
           <Row className="wow fadeInLeft" data-wow-delay="0.8s">
           {likedArtworks.map((artwork) => (
              <Col key={artwork.id} md={4} className="mb-4">
                  <Card className="profile-card">
                      <Card.Img variant="top" src={artwork.image_url} loading="lazy" />
                      <Card.Body>
                          <Card.Title>{artwork.name}</Card.Title>
                          <Card.Text className="text-2">{artwork.description}</Card.Text>
                      </Card.Body>
                 </Card>
             </Col>
          ))}
           </Row>
        </Container>
    );
};

export default UserProfile;
