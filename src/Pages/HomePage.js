import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button, Image, ListGroup, ListGroupItem } from "react-bootstrap";
import "./HomePage.css";
import { FaArrowAltCircleRight, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import WOW from "wowjs";
import "animate.css";

function HomePage() {
  useEffect(() => {
    new WOW.WOW().init();  // Initialize WOW.js
  }, []);

  const handleCardClick = (href) => {
    window.location.href = href; // Navigate to href
  };

  return (
    <div>
      {/* Header Section */}
      <header className="header-section bg-dark text-white text-center py-4 wow fadeInDown" data-wow-duration="1.5s"style={{ boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)" }} >
        <h1 className="display-4 unbounded-uniquifier-h1 text-white">DERRICKS CREATION DEMO</h1>
        <p>Discover the world of art, history, and culture</p>
        <a className="btn welcome-button btn-dark text-dark unbounded-uniquifier-header" href="/reference" role="button">
          Learn More <FaArrowRight />
        </a>
      </header>

      {/* Art Category Sections */}
      <section className="py-5 mt-5 mb-5">
        <Container>
          <Row className="mb-4">
            <h1 className="unbounded-uniquifier-header wow fadeInLeft">Navigate</h1>
            <hr/>
            <p className="unbounded-uniquifier-header wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0.2s">Click the cards to directly go to the specific art section</p>
          </Row>
          <Row className="gy-5 text-center justify-content-center">
            <Col>
              <motion.div className="wow fadeInUp" data-wow-duration="1s" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} data-bs-theme="dark">
                <Card className="mx-auto" style={{ width: "21rem", boxShadow: "0 0px 15px rgba(0, 0, 0, 0.5)" }} onClick={() => handleCardClick("/artwork#animated-artworks")}>
                  <Card.Img variant="top" src="https://i.pinimg.com/originals/a3/7e/48/a37e48e6e5e0edb1b2ffbee6a73fbd59.gif" />
                  <Card.Body>
                    <Card.Title className="unbounded-uniquifier-header">Lights 0NN</Card.Title>
                    <Card.Text className="unbounded-uniquifier-p2 text-muted">We at Derricks Demo provide a myriad of art on view, to see more animated/gifs that we have on offer, tap the card</Card.Text>
                  </Card.Body>
                  <ListGroup variant="flush">
                  <ListGroupItem className="unbounded-uniquifier-header"><Card.Link href="/artwork#animated-artworks">Animated <FaArrowRight /></Card.Link></ListGroupItem>
                  </ListGroup>
                </Card>
              </motion.div>
            </Col>

            <Col>
              <motion.div className="wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} data-bs-theme="dark">
                <Card className="mx-auto" style={{ width: "21rem", boxShadow: "0 0px 15px rgba(0, 0, 0, 0.5)" }} onClick={() => handleCardClick("/artwork#static-artworks")}>
                  <Card.Img variant="top" src="https://i.pinimg.com/564x/10/9a/dd/109addc2397a3257c90b61acccb7a273.jpg" />
                  <Card.Body>
                    <Card.Title className="unbounded-uniquifier-header">Tesla</Card.Title>
                    <Card.Text className="unbounded-uniquifier-p2 text-muted">We at Derricks Demo provide a myriad of art on view, to see more regular/static art that we have on offer, tap the card</Card.Text>
                  </Card.Body>
                  <ListGroup variant="flush">
                    <ListGroupItem className="unbounded-uniquifier-header"><Card.Link href="/artwork#static-artworks">Static <FaArrowRight /></Card.Link></ListGroupItem>
                  </ListGroup>
                </Card>
              </motion.div>
            </Col>
           
            <Col>
              <motion.div className="wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.4s" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} data-bs-theme="dark">
                <Card className="mx-auto" style={{ width: "21rem", boxShadow: "0 0px 15px rgba(0, 0, 0, 0.5)" }} onClick={() => handleCardClick("/artwork#add-artwork")}>
                  <Card.Img variant="top" src=" https://i.pinimg.com/originals/db/5a/54/db5a547a554cfaebfcb48aa1e8462918.gif" />
                  <Card.Body>
                     <Card.Title className="unbounded-uniquifier-header">Raging Fury</Card.Title>
                     <Card.Text className="unbounded-uniquifier-p2 text-muted">If you fancy yourself a bit of an artist, tap the card, and go through the process of posting your own art piece</Card.Text>
                  </Card.Body>
                  <ListGroup variant="flush">
                  <ListGroupItem className="unbounded-uniquifier-header"><Card.Link href="/artwork#add-artwork">Submit <FaArrowRight /></Card.Link></ListGroupItem>
                  </ListGroup>
                </Card>
              </motion.div>
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
                Not only the outstanding quality of the collection, but also our high
                level of activity in the areas of research, exhibitions, and education
                guarantee the Ozeum's prominent position in the international museum
                landscape.
              </p>
              <Button variant="dark" href="/about" className="welcome-button m-5 text-dark unbounded-uniquifier-h1" style={{boxShadow: "0 0px 15px rgba(0, 0, 0, 0.5)" }}>
                More About <FaArrowRight />
              </Button>
            </Col>

            <Col>
              <Image
                src="https://i.pinimg.com/564x/10/9a/dd/109addc2397a3257c90b61acccb7a273.jpg"
                alt="..."
                fluid
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
          <Col md={3}>
            <Image
              src="https://i.pinimg.com/enabled_hi/564x/ab/68/86/ab68861f180d341161e5e69082b9d974.jpg"
              alt="Smoking kills"
              fluid
              rounded
            />
            <p className="unbounded-uniquifier-h1">Smoking kills</p>
          </Col>
          <Col md={3}>
            <Image
              src="https://i.pinimg.com/736x/6b/37/9b/6b379bbc075111aa52bf6f06f1bfc0ed.jpg"
              alt="Halftone"
              fluid
              rounded
            />
            <p className="unbounded-uniquifier-h1">Halftone</p>
          </Col>
          <Col md={3}>
            <Image
              src="https://i.pinimg.com/enabled_hi/564x/9c/fe/01/9cfe017fd0ad40807f79fead11415e3d.jpg"
              alt="Speedster"
              fluid
              rounded
            />
            <p className="unbounded-uniquifier-h1">Speedster</p>
          </Col>
          <Col md={3}>
            <Image
              src="https://i.pinimg.com/enabled_hi/564x/12/c2/25/12c225b47a96bf8b2fdb62811caff5a3.jpg"
              alt="911"
              fluid
              rounded
            />
            <p className="unbounded-uniquifier-h1">911</p>
          </Col>
        </Row>
      </section>
    </div>
  );
}

export default HomePage;
