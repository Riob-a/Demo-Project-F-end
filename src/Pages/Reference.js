import React, { useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Image, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import WOW from "wowjs";
import "animate.css";
import "./HomePage.css";

const MemoizedCard = React.memo(({ section, href , imgSrc, title, text, wowDelay, navigateToSection }) => (
  <motion.div
    className="wow fadeInUp"
    data-wow-duration="1s"
    data-wow-delay={wowDelay}
    data-bs-theme="dark"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => navigateToSection(section)}
    style={{ cursor: "pointer" }}
  >
    <Card
      className="mx-auto"
      style={{ width: "21rem", boxShadow: "0 0px 15px rgba(0, 0, 0, 0.5)" }}
    >
      <Card.Img variant="top" src={imgSrc} loading="lazy" />
      <Card.Body>
        <Card.Title className="unbounded-uniquifier-header">{title}</Card.Title>
        <Card.Text className="unbounded-uniquifier-p2 text-muted">{text}</Card.Text>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroupItem className="unbounded-uniquifier-header">
          {title} <FaArrowRight />
        </ListGroupItem>
      </ListGroup>
    </Card>
  </motion.div>
));

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const wowInstance = new WOW.WOW();
    wowInstance.init();
    return () => wowInstance.sync();
  }, []);

  const navigateToSection = (section) => {
    navigate(`/artwork#${section}`);
  };

  return (
    <div>
      {/* Header Section */}
      <header className="header-section bg-dark text-white text-center py-4 wow fadeInDown" data-wow-duration="1.5s">
        <h1 className="display-4 unbounded-uniquifier-h1">DERRICKS CREATION DEMO</h1>
        <p>Discover the world of art, history, and culture</p>
        <a className="btn welcome-button btn-dark text-dark unbounded-uniquifier-h1" href="/reference" role="button">
          Learn More <FaArrowRight />
        </a>
      </header>

      {/* Art Category Sections */}
      <section className="py-5 mt-5 mb-5">
        <Container>
          <Row className="mb-4 text-center">
            <h1 className="unbounded-uniquifier-header wow fadeInLeft">Navigate</h1>
            <hr />
            <p className="unbounded-uniquifier-header wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0.2s">
              Click the cards to go to the specific art section
            </p>
          </Row>
          <Row className="gy-5 text-center justify-content-center">
            <Col>
              <MemoizedCard
                section="animated-artworks"
                imgSrc="https://i.pinimg.com/originals/a3/7e/48/a37e48e6e5e0edb1b2ffbee6a73fbd59.gif"
                title="Animated"
                text="See more animated art by tapping the card."
                wowDelay="0s"
                navigateToSection={navigateToSection}
              />
            </Col>
            <Col>
              <MemoizedCard
                section="static-artworks"
                imgSrc="https://i.pinimg.com/564x/10/9a/dd/109addc2397a3257c90b61acccb7a273.jpg"
                title="Static"
                text="Explore our static art collection by tapping the card."
                wowDelay="0.2s"
                navigateToSection={navigateToSection}
              />
            </Col>
            <Col>
              <MemoizedCard
                section="add-artwork"
                imgSrc="https://i.pinimg.com/originals/db/5a/54/db5a547a554cfaebfcb48aa1e8462918.gif"
                title="Submit"
                text="Submit your own artwork by tapping the card."
                wowDelay="0.4s"
                navigateToSection={navigateToSection}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Welcome Section */}
      <section className="welcome-section py-5 text-center bg-dark text-white wow fadeInUp" data-wow-duration="1.5s">
        <Container>
          <Row>
            <Col>
              <h2 className="unbounded-uniquifier-header">Welcome To The Art And History Museum Ozeum</h2>
              <hr />
              <p className="unbounded-uniquifier-p1">
                Our high-quality collection and active research, exhibitions, and education keep us at the forefront of the museum landscape.
              </p>
              <Button
                variant="dark"
                href="/about"
                className="welcome-button m-5 text-dark unbounded-uniquifier-h1"
                style={{ boxShadow: "0 0px 15px rgba(0, 0, 0, 0.5)" }}
              >
                More About <FaArrowRight />
              </Button>
            </Col>
            <Col>
              <Image
                src="https://i.pinimg.com/564x/10/9a/dd/109addc2397a3257c90b61acccb7a273.jpg"
                alt="Museum"
                fluid
                loading="lazy"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Collection Section */}
      <section className="container overflow-hidden py-5 wow fadeInUp" data-wow-duration="1s">
        <h3 className="text-center unbounded-uniquifier-h1">Collection</h3>
        <hr />
        <Row>
          {[
            { src: "https://i.pinimg.com/564x/ab/68/86/ab68861f180d341161e5e69082b9d974.jpg", alt: "Smoking kills", caption: "Smoking kills" },
            { src: "https://i.pinimg.com/736x/6b/37/9b/6b379bbc075111aa52bf6f06f1bfc0ed.jpg", alt: "Halftone", caption: "Halftone" },
            { src: "https://i.pinimg.com/564x/9c/fe/01/9cfe017fd0ad40807f79fead11415e3d.jpg", alt: "Speedster", caption: "Speedster" },
            { src: "https://i.pinimg.com/564x/12/c2/25/12c225b47a96bf8b2fdb62811caff5a3.jpg", alt: "911", caption: "911" }
          ].map((item, idx) => (
              <Col key={idx} md={3}>
                <Image src={item.src} alt={item.alt} fluid rounded loading="lazy" />
                <p className="unbounded-uniquifier-h1">{item.caption}</p>
              </Col>
          ))}
        </Row>
      </section>
    </div>
  );
}

export default HomePage;
