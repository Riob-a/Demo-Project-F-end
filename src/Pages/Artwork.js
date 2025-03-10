import React, { useState, useContext } from "react";
import { Container, Row, Form, Button, Card, Col, Accordion, ProgressBar } from "react-bootstrap";
import { motion } from "framer-motion";
import "./ARt.css";
import { FaCircleArrowUp, FaHeart, FaRegHeart, FaXmark } from "react-icons/fa6";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { ThemeContext } from "../Components/ThemeContext";
import useArtwork from "../hooks/useArtwork";

const ArtworkCard = ({ artwork, wowDelay, likeArtwork, unlikeArtwork }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(artwork.isLiked || false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleLikeToggle = async (e) => {
    e.stopPropagation(); // Prevent card click from expanding
    try {
      if (isLiked) {
        await unlikeArtwork(artwork.id);
      } else {
        await likeArtwork(artwork.id);
      }
      setIsLiked(!isLiked); // Toggle like state locally
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <motion.div
      className={`card-hover  ${isExpanded ? "expanded" : ""}`}
      data-wow-duration="1s"
      data-wow-delay={wowDelay}
      whileHover={{ scale: isExpanded ? 1 : 1.05 }}
      whileTap={{ scale: isExpanded ? 1 : 0.95 }}
      onClick={toggleExpand}
      style={{
        cursor: "pointer",
        transition: "max-height 0.3s ease-in-out",
      }}
    >
      <Card
        className="mx-auto  wow fadeInLeft grid-container"
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
          <Card.Text className="unbounded-uniquifier-p2">
            {isExpanded
              ? artwork.description
              : `${artwork.description.substring(0, 100)}...`}
          </Card.Text>
          <div className="d-flex justify-content-between align-items-center unbounded-uniquifier-p">
            <div>
              <strong>Likes:</strong> {artwork.likes !== undefined ? artwork.likes : 0}
            </div>
            <Button variant="link" onClick={handleLikeToggle}>
              {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
            </Button>
          </div>
          {isExpanded && (
            <>
              <Card.Text>
                <br />
                <strong className="unbounded-uniquifier-header">Author: </strong>{artwork.email}
              </Card.Text>
              <Button
                variant="danger unbounded-uniquifier-header"
                className="rounded-5"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click from collapsing
                  setIsExpanded(false);
                }}
              >
                {/* Close  */}
                <FaXmark />
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </motion.div>
  );
};

const Artwork = ({ artworkId }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const {
    formData,
    animatedArtworks,
    staticArtworks,
    submissionStatus,
    isSubmitting,
    uploadProgress,
    showScrollToTop,
    staticRef,
    scrollToTop,
    handleChange,
    handleFileChange,
    handleSubmit,
    likeArtwork,
    unlikeArtwork,
    fetchArtworks,
  } = useArtwork();

  const renderArtworkGrid = (artworks) => (
    <Row className="g-4">
      {artworks.map((artwork, index) => (
        <Col key={artwork.id} sm={12} md={6} lg={4}>
          <ArtworkCard
            artwork={artwork}
            wowDelay={`${0.1 * index}s`}
            likeArtwork={likeArtwork}
            unlikeArtwork={unlikeArtwork}
          />
        </Col>
      ))}
    </Row>
  );

  return (
    <div>
      <Container>
        <Accordion data-bs-theme="acc" className="justify-content-center mb-5 mt-5 wow zoomIn">
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
            <hr className="mb-5" />
            {renderArtworkGrid(animatedArtworks)}
          </section>
        </Row>

        <Row className="mb-5">
          <section id="static-artworks" className="wow fadeInLeft" ref={staticRef}>
            <h1 className="unbounded-uniquifier-artwork">Static Artworks</h1>
            <hr className="mb-5" />
            {renderArtworkGrid(staticArtworks)}
          </section>
        </Row>

        <Row>
          <section id="add-artwork" className="wow fadeInLeft">
            <h1 className="unbounded-uniquifier-h1">Add your own pieces</h1>
            <hr />
            <Col xs={12} md={6} className="wow fadeInLeft mt-5 mb-5">
              <Card className="rounded-5">
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
                      <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
                    </div>
                  )}

                  {submissionStatus && (
                    <div className="mt-3">{submissionStatus}</div>
                  )}
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
          style={{ fontSize: "2rem" }}
        />
      )}

      {/* Floating Theme Toggle Button */}
      <Button
        className="floating-theme-button"
        onClick={toggleTheme}
        variant={theme === "light" ? "dark" : "light"}
      >
        {theme === "light" ? <MdOutlineDarkMode size={24} /> : <MdOutlineLightMode size={24} />}
      </Button>
    </div>
  );
};

export default Artwork;
