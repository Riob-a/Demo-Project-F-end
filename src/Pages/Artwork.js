import React, { useState, useEffect, useCallback, useRef } from "react";
import { Container, Row, Form, Button, Card, Col, Accordion, Spinner, ProgressBar } from "react-bootstrap";
import { motion } from "framer-motion";
import WOW from "wowjs";
import "./ARt.css";
import { FaCircleArrowUp } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ArtworkCard = ({ artwork, wowDelay }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <motion.div
      className={`card-hover ${isExpanded ? "expanded" : ""}`}
      data-wow-duration="1s"
      data-wow-delay={wowDelay}
      whileHover={{ scale: isExpanded ? 1 : 1.05 }}
      whileTap={{ scale: isExpanded ? 1 : 0.95 }}
      onClick={toggleExpand}
      data-bs-theme="dark"
      style={{
        cursor: "pointer",
        transition: "max-height 0.3s ease-in-out",
      }}
    >
      <Card
        className="mx-auto wow fadeInLeft"
        style={{
          width: isExpanded ? "100%" : "21rem",
          maxHeight: isExpanded ? "none" : "450px",
          overflow: "hidden",
        }}
      >
        <Card.Img
          variant="top"
          src={artwork.image_url}
          alt={artwork.name}
          loading="lazy"
          style={{ height: isExpanded ? "auto" : "200px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title className="unbounded-uniquifier-header">
            {artwork.name}
          </Card.Title>
          <Card.Text className="unbounded-uniquifier-p2 text-muted">
            {isExpanded
              ? artwork.description
              : `${artwork.description.substring(0, 100)}...`}
          </Card.Text>
          {isExpanded && (
            <>
              <Card.Text>
                <strong className="unbounded-uniquifier-header">Style:</strong> {artwork.style}
              </Card.Text>
              <Button
                variant="danger unbounded-uniquifier-header"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click from collapsing
                  setIsExpanded(false);
                }}
              >
                Close
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </motion.div>
  );
};

function Artwork() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    style: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [animatedArtworks, setAnimatedArtworks] = useState([]);
  const [staticArtworks, setStaticArtworks] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState(null); // New state for submission status
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [uploadProgress, setUploadProgress] = useState(0);  // Track upload progress (for progress bar)
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [staticLoaded, setStaticLoaded] = useState(false);
  const staticRef = useRef(null); // Ref for the static artworks section

  const location = useLocation();

  const fetchArtworks = useCallback(async (style) => {
    const data = await fetchData(`https://demo-project-backend-qrd8.onrender.com/api/artworks/${style}`);
    if (data) {
      style === "animated" ? setAnimatedArtworks(data) : setStaticArtworks(data);
    }
  }, []);

  useEffect(() => {
    const wowInstance = new WOW.WOW();
    wowInstance.init();

    // Fetch animated artworks on load
    fetchArtworks("animated");

    // Scroll event for scroll-to-top button
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);

    // IntersectionObserver to fetch static artworks when section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !staticLoaded) {
            fetchArtworks("static");
            setStaticLoaded(true); // Ensure it only loads once
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentStaticRef = staticRef.current; // Copy ref to local variable
    if (currentStaticRef) observer.observe(currentStaticRef);

     // Scroll to section if hash exists in URL
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
      }
    }

    return () => {
      wowInstance.sync();
      window.removeEventListener("scroll", handleScroll);
      if (currentStaticRef) observer.unobserve(currentStaticRef);
    };
  }, [fetchArtworks, location.hash, staticLoaded]);

  const scrollToTop = () => {
    const scrollAnimation = () => {
      const scrollDuration = 250;
      const scrollStep = -window.scrollY / (scrollDuration / 25);

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

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set to true to show the spinner
    setUploadProgress(0);  // Reset progress bar to 0
    
    const token = localStorage.getItem("access_token");
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("style", formData.style);
    data.append("description", formData.description);
    if (imageFile) data.append("image", imageFile);

    try {
    const response = await axios.post("https://demo-project-backend-qrd8.onrender.com/api/artworks/submit", data, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percent); // Update progress state
      }
    });

    if (response.status === 201) {
      setSubmissionStatus("Artwork submitted successfully!");
      setFormData({ name: "", email: "", description: "", style: "" });
      setImageFile(null);
      setTimeout(()=>{
        setSubmissionStatus(null);

        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => window.location.reload(), 500);
      }, 3000);      

      fetchArtworks(formData.style);

    } else {
      setSubmissionStatus("Failed to submit artwork. Please try again.");
    }
  }catch (error) {
    console.error("Error:", error);
    setSubmissionStatus("Error occurred. Please try again.")
  }finally {
    setIsSubmitting(false);
  }
  };

  const renderArtworkGrid = (artworks) => (
    <Row className="g-4">
      {artworks.map((artwork, index) => (
        <Col key={artwork.id} sm={12} md={6} lg={4}>
          <ArtworkCard artwork={artwork} wowDelay={`${0.1 * index}s`} />
        </Col>
      ))}
    </Row>
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
                    <a href="#animated-artworks" className="unbounded-uniquifier-header wow fadeInLeft" data-wow-delay="0" onClick={() => fetchArtworks("animated")}>Animated Artworks</a>
                  </li>
                  <li>
                    <a href="#static-artworks" className="unbounded-uniquifier-header wow fadeInLeft" data-wow-delay="0.2s" onClick={() => fetchArtworks("static")}>Static Artworks</a>
                  </li>
                  <li>
                    <a href="#add-artwork" className="unbounded-uniquifier-header wow fadeInLeft" data-wow-delay="0.4s">Submit Artwork</a>
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
            <h1 className="unbounded-uniquifier-artwork">Animated Artworks</h1>
            <hr className="mb-5"/>
            {renderArtworkGrid(animatedArtworks)}
          </section>
        </Row>

        <Row className="mb-5">
          <section id="static-artworks" className="wow fadeInLeft" ref={staticRef}>
            <h1 className="unbounded-uniquifier-artwork">Static Artworks</h1>
            <hr className="mb-5"/>
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
                    <Form.Group controlId="name">
                      <Form.Label className="unbounded-uniquifier-header">Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter your title"
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

                    <Form.Group controlId="image">
                      <Form.Label className="unbounded-uniquifier-header">Upload Image</Form.Label>
                      <Form.Control
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="style">
                      <Form.Label className="unbounded-uniquifier-header">Artwork Style</Form.Label>
                      <Form.Select
                        name="style"
                        value={formData.style}
                        onChange={handleChange}
                      >
                        <option value="">Select a style</option>
                        <option value="animated">Animated</option>
                        <option value="static">Static</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="description">
                      <Form.Label className="unbounded-uniquifier-header">Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="description"
                        rows={3}
                        placeholder="Enter description"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Button type="submit" className="mt-3 unbounded-uniquifier-header" disabled={isSubmitting}>Submit Artwork</Button>
                  </Form>
                  {isSubmitting && (
                    <div className="d-flex justify-content-center mt-3">
                       {/* <Spinner animation="border" variant="primary" /> */}
                       <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
                       {/* <span className="ml-2">Submitting...</span> */}
                    </div>
                  )}

                  {submissionStatus && ( <div className="mt-3">{submissionStatus}</div> )}
                </Card.Body>
              </Card>
            </Col>
          </section>
        </Row>
      </Container>

      {showScrollToTop && (
        <FaCircleArrowUp
          className="scroll-to-top"
          onClick={scrollToTop}
          style={{ fontSize: "2rem", position: "fixed", bottom: "20px", right: "20px", cursor: "pointer" }}
        />
      )}
    </div>
  );
}

export default Artwork;
