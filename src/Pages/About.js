import React, { useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion"
import { WOW } from 'wowjs';  // Import WOW.js
import 'animate.css/animate.min.css';  // Import Animate.css for animations

function About() {
  useEffect(() => {
    new WOW().init();
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  return (
    <div>
      <Container className="welcome-section py-5 text-center justify-content-center mb-5 mt-5">
        <Row className="gy-5">
          <Col xs={12} md={6}>
            <h1 className="wow fadeInUp unbounded-uniquifier-h1">About</h1>
            <hr />
            <p className="lead wow fadeInUp unbounded-uniquifier-p" data-wow-delay="1.2s">
              A website dedicated to display the artworks of any and all interested, in posting their art
            </p>
            <motion.a className="btn btn-primary  unbounded-uniquifier-header wow fadeInUp" href="/artwork" role="button" whileHover={{ scale: 1.05, color: "#FF0000" }} whileTap={{ scale: 0.95 }} style={{boxShadow: "0 0px 15px rgba(0, 0, 0, 0.5)" }}>
              ARt <FaArrowRight />
            </motion.a>
          </Col>

          <Col xs={12} md={6}>
            <Image
              src="https://i.pinimg.com/736x/5a/c8/af/5ac8af380fdd090598de21cabcfe8f04.jpg"
              alt="..."
              fluid
              className="wow fadeInUp"
              data-wow-delay="0.1s"
              rounded
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default About;
