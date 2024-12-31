import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Image, Button, Carousel } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { WOW } from "wowjs";
import "animate.css/animate.min.css";
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from "react-icons/fa";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { ThemeContext } from "../Components/ThemeContext";
import "./About.css";

function About() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const images = [
    "https://i.pinimg.com/736x/5a/c8/af/5ac8af380fdd090598de21cabcfe8f04.jpg",
    "https://i.pinimg.com/originals/a3/7e/48/a37e48e6e5e0edb1b2ffbee6a73fbd59.gif",
    "https://i.pinimg.com/564x/10/9a/dd/109addc2397a3257c90b61acccb7a273.jpg",
  ];

  useEffect(() => {
    new WOW().init();

    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, images.length]);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div>
      {/* Floating Theme Toggle Button */}
      <Button
        className="floating-theme-button"
        onClick={toggleTheme}
        variant={theme === "light" ? "dark" : "light"}
      >
        {theme === "light" ? <MdOutlineDarkMode size={24} /> : <MdOutlineLightMode size={24} />}
      </Button>
      
      {/* Welcome Section */}
      <Container className="welcome-section py-5 text-center justify-content-center mb-5 mt-5">
        <Row className="gy-5">
          <Col xs={12} md={6}>
            <h1 className="wow fadeInUp unbounded-uniquifier-h1">About</h1>
            <hr />
            <p className="lead wow fadeInUp unbounded-uniquifier-p" data-wow-delay="1.2s">
              Welcome to our platform, where creativity knows no bounds. We provide a hub for artists and art enthusiasts to share, explore, and celebrate diverse artwork styles, from animated to static designs.
            </p>
            <p className="wow fadeInUp" data-wow-delay="1.5s">
              Join a community of over <strong>10,000</strong> pieces of art shared by talented artists worldwide!
            </p>
            <motion.a
              className="btn btn-primary unbounded-uniquifier-header wow fadeInUp"
              href="/artwork"
              role="button"
              whileHover={{ scale: 1.05, color: "#EA8E1D" }}
              whileTap={{ scale: 0.95 }}
              style={{ boxShadow: "0 0px 15px rgba(0, 0, 0, 0.5)" }}
            >
              Explore Art <FaArrowRight />
            </motion.a>
          </Col>
          <Col xs={12} md={6}>
            <motion.div
              key={images[currentImageIndex]} // Trigger animation on image change
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0 }}
            >
              <Image
                src={images[currentImageIndex]}
                alt="A collage of artworks"
                fluid
                className="wow fadeInUp image-fade"
                data-wow-delay="0.1s"
              />
            </motion.div>
            <div className="mt-3 wow fadeInUP" data-wow-delay="">

              <Button variant="dark" onClick={handlePrevious} className="me-2 button-image wow fadeInUp" data-wow-delay="0.8s">
                 |<FaChevronLeft />
              </Button>

              <Button  variant={isPlaying ? "dark" : "light"} onClick={() => setIsPlaying((prev) => !prev)} className="me-2 wow fadeInUp" data-wow-delay="0.6s">
                {isPlaying ? <FaPause /> : <FaPlay />}
              </Button>

              <Button variant="dark" onClick={handleNext} className="button-image wow fadeInUp" data-wow-delay="0.4s">
                 <FaChevronRight />|
              </Button>

            </div>
          </Col>
        </Row>
      </Container>
  
      {/* Key Features */}
      <Container className="features-section py-5 mb-4">
        <h2 className="text-center wow fadeInUp">Why Join Us?</h2>
        <Row className="mt-4 gy-4">
          <Col xs={12} md={4} className="text-center wow fadeInUp" data-wow-delay="0.2s">
            <h4>Diverse Art Collection</h4>
            <p>Explore a rich collection of animated and static artworks, showcasing creativity from all around the globe.</p>
          </Col>
          <Col xs={12} md={4} className="text-center wow fadeInUp" data-wow-delay="0.4s">
            <h4>Community Engagement</h4>
            <p>Connect with like-minded artists and art enthusiasts. Share feedback, comments, and appreciation.</p>
          </Col>
          <Col xs={12} md={4} className="text-center wow fadeInUp" data-wow-delay="0.6s">
            <h4>Simple & Seamless</h4>
            <p>Effortlessly upload and showcase your artwork while reaching a global audience with a few clicks.</p>
          </Col>
        </Row>
      </Container>

      {/* Testimonials */}
      <Container className="testimonials-section py-5 bg-dark text-white text-center">
        <h2 className="wow fadeInUp">What Our Users Say</h2>
        <Carousel className="mt-4 wow fadeInUp" data-wow-delay="0.8s">
          <Carousel.Item>
            <p>"This platform has been a game-changer for my art career!" – Jane Doe</p>
          </Carousel.Item>
          <Carousel.Item>
            <p>"I’ve discovered so many amazing artists here. Truly inspiring!" – John Smith</p>
          </Carousel.Item>
          <Carousel.Item>
            <p>"The submission process is so simple, and the exposure is fantastic!" – Maria Lopez</p>
          </Carousel.Item>
        </Carousel>
      </Container>

      {/* Call to Action */}
      <Container className="cta-section py-5 text-center mb-5">
        <h2 className="wow fadeInUp">Ready to Share Your Creativity?</h2>
        <br />
        <motion.a
          className="btn btn-secondary wow fadeInUp"
          href="/register"
          role="button"
          whileHover={{ scale: 1.05, color: "#FFFFFF" }}
          whileTap={{ scale: 0.95 }}
          style={{ boxShadow: "0 0px 15px rgba(0, 0, 0, 0.5)" }}
        >
          Join Us <FaArrowRight />
        </motion.a>
      </Container>
    </div>
  );
}

export default About;
