import React from "react";
import { Container, Row, Col, Card, Button, Image, ListGroup, ListGroupItem } from "react-bootstrap";
import "./HomePage.css"
import { FaArrowAltCircleDown, FaArrowAltCircleRight, FaArrowRight } from "react-icons/fa";
import "animate.css";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";



function HomePage() {
  const { ref, inView } = useInView({
    triggerTwo: true,   // Animation triggers only once when in view
    threshold: 0.1       // Trigger when 10% of the section is visible
  });
  
  return (
    <div>
      {/* Header Section */}
      <motion.header className="header-section bg-dark text-white text-center py-4"
      initial={{ opacity: 0, y:-50 }}
      animate={{ opacity: 1, y: 0}}
      transition={{ duration: 1.5}}>
        <h1 style={{textShadow: "0 0px 15px rgba(0, 0, 0, 0.5)"}}>Art and History Museum Ozeum</h1>
        <p className="" style={{textShadow: "0 0px 15px rgba(0, 0, 0, 0.5)"}}>Discover the world of art, history, and culture</p>
        <motion.a className="btn welcome-button btn-dark text-dark" href="/reference" role="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Learn More <FaArrowAltCircleRight/> </motion.a>
      </motion.header>

      {/* Art Category Sections */}
      <section className="py-5 mt-5 mb-5">
        <Container>
          <Row className="gy-5 text-center justify-content-center">
            <Col>
              {/* <h3></h3> */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card className="mx-auto" style={{ width: "21rem", boxShadow: "0 0px 15px rgba(0, 0, 0, 0.5)" }} border="" bg='' data-bs-theme="light">
                <Card.Img variant="top" src="https://i.pinimg.com/564x/c2/ce/8c/c2ce8c29b59e0087d10c92a7fe16e075.jpg"/>
                <ListGroup variant="flush">
                  <ListGroupItem>item 1</ListGroupItem>
                  <ListGroupItem>item 1</ListGroupItem>
                  <ListGroupItem>item 1</ListGroupItem>
                </ListGroup>
              </Card>
              </motion.div>
            </Col>

            <Col>
              {/* <h3></h3> */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card className="mx-auto" style={{ width: "21rem", boxShadow: "0 0px 15px rgba(0, 0, 0, 0.5)" }} border="" bg='' data-bs-theme="light">
                <Card.Img variant="top" src="https://i.pinimg.com/564x/90/ed/8c/90ed8ca7e9a78888e49dc591131cbb7c.jpg"/>
                <ListGroup variant="flush">
                  <ListGroupItem>iteme 1</ListGroupItem>
                  <ListGroupItem>iteme 1</ListGroupItem>
                  <ListGroupItem>iteme 1</ListGroupItem>
                </ListGroup>
              </Card>
              </motion.div>
            </Col>

            <Col>
              {/* <h3></h3> */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card className="mx-auto" style={{ width: "21rem", boxShadow: "0 0px 15px rgba(0, 0, 0, 0.5)" }} border="" bg='' data-bs-theme="light">
                <Card.Img variant="top" src="https://i.pinimg.com/564x/10/9a/dd/109addc2397a3257c90b61acccb7a273.jpg"/>
                <ListGroup variant="flush">
                  <ListGroupItem>item 1</ListGroupItem>
                  <ListGroupItem>item 1</ListGroupItem>
                  <ListGroupItem>item 1</ListGroupItem>
                </ListGroup>
              </Card>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Welcome Section */}
      <motion.section 
      ref={ref}
      className=" welcome-section py-5 text-center bg-dark text-white"
      initial={{ opacity: 0, y: -50 }}
      animate={inView ? { opacity: 1, y: 0} : { opacity: 0, y: 50}}
      transition={{ duration: 1.5}}
      >
        <Container>
          <Row>
            <Col>
              <h2>Welcome To The Art And History Museum Ozeum</h2>
              <hr />
              <p>
                Not only the outstanding quality of the collection, but also our high
                level of activity in the areas of research, exhibitions, and education
                guarantee the Ozeum's prominent position in the international museum
                landscape.
              </p>
              <Button variant="dark" href="#" className=" welcome-button m-5 text-dark">
                More About <FaArrowRight/>
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
      </motion.section>

      {/* Collection Section */}
      <section className="container overflow-hidden py-5">
        <h3 className="text-center">Collection</h3>
        <hr />
        <Row>
          <Col md={3}>
            <Image
              src="https://art.rtistiq.com/en-us/_next/image?url=https%3A%2F%2Fd28jbe41jq1wak.cloudfront.net%2FBlogsImages%2FContemporaryArt_Compressed_638218930354738719.jpg&w=1920&q=75"
              alt="Madonna with Saints"
              fluid
              rounded
            />
            <p>Madonna with Saints</p>
          </Col>
          <Col md={3}>
            <Image
              src="https://art.rtistiq.com/en-us/_next/image?url=https%3A%2F%2Fd28jbe41jq1wak.cloudfront.net%2FBlogsImages%2FContemporaryArt_Compressed_638218930354738719.jpg&w=1920&q=75"
              alt="The Adoration of the Magi"
              fluid
              rounded
            />
            <p>The Adoration of the Magi</p>
          </Col>
          <Col md={3}>
            <Image
              src="https://art.rtistiq.com/en-us/_next/image?url=https%3A%2F%2Fd28jbe41jq1wak.cloudfront.net%2FBlogsImages%2FContemporaryArt_Compressed_638218930354738719.jpg&w=1920&q=75"
              alt="Pallas and the Centaur"
              fluid
              rounded
            />
            <p>Pallas and the Centaur</p>
          </Col>
          <Col md={3}>
            <Image
              src="https://art.rtistiq.com/en-us/_next/image?url=https%3A%2F%2Fd28jbe41jq1wak.cloudfront.net%2FBlogsImages%2FContemporaryArt_Compressed_638218930354738719.jpg&w=1920&q=75"
              alt="Annunciation"
              fluid
              rounded
            />
            <p>Annunciation</p>
          </Col>
        </Row>
      </section>
    </div>
  );
}

export default HomePage;
