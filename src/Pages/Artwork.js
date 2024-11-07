import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Form, Button, Card, Col, Accordion } from "react-bootstrap";
import { motion } from "framer-motion";
import WOW from "wowjs";
import "./ARt.css";
import { FaCircleArrowUp } from "react-icons/fa6";

function Artwork() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    imageUrl: "",
    description: "",
    style: ""
  });

  const [animatedArtworks, setAnimatedArtworks] = useState([]);
  const [staticArtworks, setStaticArtworks] = useState([]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Use useCallback to memoize the fetchArtworks function
  const fetchArtworks = useCallback(async (style) => {
    const data = await fetchData(`http://127.0.0.1:5000/api/artworks/${style}`);
    if (data) {
      style === "animated" ? setAnimatedArtworks(data) : setStaticArtworks(data);
    }
  }, []); // Empty dependency array, as this function does not depend on any external state

  useEffect(() => {
    const wowInstance = new WOW.WOW();
    wowInstance.init();

    const fetchBothArtworks = async () => {
      await Promise.all([fetchArtworks("animated"), fetchArtworks("static")]);
    };
    fetchBothArtworks();

    // Handle URL hash scrolling
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    // Scroll up button
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);

    return () => wowInstance.sync();
  }, [fetchArtworks]); // Including fetchArtworks in the dependency array to ensure it is up-to-date

  const scrollToTop = () => {
    const scrollAnimation = () => {
      const scrollDuration = 250; // Total scroll duration in milliseconds
      const scrollStep = -window.scrollY / (scrollDuration / 25); // Calculate step size
  
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
        requestAnimationFrame(scrollAnimation);
      }
    };
  
    requestAnimationFrame(scrollAnimation);
  };

  const fetchData = async (url, options = {}) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        return await response.json();
      } else if (response.status === 401) {
        alert("Session expired. Please Sign in again");
        localStorage.removeItem("access_token");
        window.location.href = "/";
      } else {
        console.error("Failed to fetch data");
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetchData("http://127.0.0.1:5000/api/artworks/submit", {
      method: "POST",
      body: JSON.stringify(formData)
    });

    if (data) {
      alert("Artwork submitted successfully!");
      fetchArtworks(formData.style);
    } else {
      alert("Failed to submit artwork. Please try again.");
    }
  };

  const renderArtworkGrid = (artworks) => (
    <div className="grid-container p-2">
      {artworks.map((artwork, index) => (
        <motion.div
          className="card wow fadeInLeft"
          key={index}
          data-wow-duration="1s"
          data-wow-delay={`${0.1 * index}s`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-bs-theme="dark"
        >
          <img src={artwork.image_url} alt={artwork.name} loading="lazy" />
          <div className="card-content">
            <h3>{artwork.name}</h3>
            <p>{artwork.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div>
      <Container>
        <Accordion data-bs-theme="dark" className="justify-content-center mb-5 mt-5 wow zoomIn">
          <Accordion.Item eventKey="0">
            <Accordion.Header className="unbounded-uniquifier-header">Artwork Sections</Accordion.Header>
            <Accordion.Body>
              <nav>
                <ul>
                  <li>
                    <a
                      href="#animated-artworks"
                      className="unbounded-uniquifier-header wow fadeInLeft"
                      data-wow-delay="0"
                      onClick={() => fetchArtworks("animated")}
                    >
                      Animated Artworks
                    </a>
                  </li>
                  <li>
                    <a
                      href="#static-artworks"
                      className="unbounded-uniquifier-header wow fadeInLeft"
                      data-wow-delay="0.2s"
                      onClick={() => fetchArtworks("static")}
                    >
                      Static Artworks
                    </a>
                  </li>
                  <li>
                    <a href="#add-artwork" className="unbounded-uniquifier-header wow fadeInLeft"
                       data-wow-delay="0.4s"
                    >
                      Submit Artwork
                    </a>
                  </li>
                </ul>
              </nav>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
      <Container className="justify-content-center mb-5 mt-5">
        <Row className="mb-5">
          <section id="animated-artworks" className="wow fadeInLeft">
            <h1 className="unbounded-uniquifier-h1">Animated Artworks</h1>
            <hr />
            {renderArtworkGrid(animatedArtworks)}
          </section>
        </Row>

        <Row className="mb-5">
          <section id="static-artworks" className="wow fadeInLeft">
            <h1 className="unbounded-uniquifier-h1">Static Artworks</h1>
            <hr />
            {renderArtworkGrid(staticArtworks)}
          </section>
        </Row>

        <Row>
          <section id="add-artwork" className="wow fadeInLeft">
            <h1 className="unbounded-uniquifier-h1">Add your own pieces</h1>
            <hr />
            <Col xs={12} md={6} className="wow fadeInLeft mt-5">
              <Card className="card-color text-white">
                <Card.Body className="p-5">
                  <Card.Title className="contact-card mb-4 unbounded-uniquifier-h1">Submit Your Artwork</Card.Title>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name" className="mb-3">
                      <Form.Label className="unbounded-uniquifier-h1">Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="email">
                      <Form.Label className="unbounded-uniquifier-header">Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="imageUrl">
                      <Form.Label className="unbounded-uniquifier-header">Image URL</Form.Label>
                      <Form.Control
                        type="url"
                        name="imageUrl"
                        placeholder="Enter image URL"
                        value={formData.imageUrl}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="style">
                      <Form.Label className="unbounded-uniquifier-header">Style</Form.Label>
                      <Form.Select
                        name="style"
                        value={formData.style}
                        onChange={handleChange}
                      >
                        <option>Select style</option>
                        <option value="animated">Animated</option>
                        <option value="static">Static</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="description">
                      <Form.Label className="unbounded-uniquifier-header">Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="description"
                        placeholder="Add a description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3 unbounded-uniquifier-header">
                      Submit Artwork
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </section>
        </Row>
      </Container>

      {showScrollToTop && (
        <Button onClick={scrollToTop} className="scroll-btn"><FaCircleArrowUp /> </Button>
      )}
    </div>
  );
}

export default Artwork;
