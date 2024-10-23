import React, { useState, useEffect } from "react";
import { Container, Row, Form, Button, Card, Col, Accordion } from "react-bootstrap";
import { motion } from "framer-motion";
import WOW from "wowjs";
import "./ARt.css";

function Artwork() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    imageUrl: '',
    type:''
  });

  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    // Handle form submission logic here (e.g., sending to a backend)
  };

  useEffect(() => {
    // Scroll to the section if the hash exists in the URL
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const renderArtworkGrid = (artworks) => {
    return (
      <div className="grid-container">
        {artworks.map((artwork, index) => (
          <motion.div className="card wow fadeInLeft" key={index} data-wow-duration="1s" data-wow-delay={`${0.1 * index}s`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} data-bs-theme="dark">
            <img src={artwork.image} alt={artwork.title} />
            <div className="card-content">
              <h3>{artwork.title}</h3>
              <p>{artwork.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const animatedArtworks = [
    { image: "https://i.pinimg.com/originals/db/5a/54/db5a547a554cfaebfcb48aa1e8462918.gif", title: "Raging fury", description: "Description of this piece" },
    { image: "https://i.pinimg.com/originals/47/51/a5/4751a5150b14cab7056a8a0d72576e5a.gif", title: "StandART II", description: "nosce te ipsum" },
    { image: "https://i.pinimg.com/originals/b2/d7/fd/b2d7fddd6261a9fcd9327645ded6209f.gif", title: "lh3.googleusercontent.com", description: "Description of artwork 3" },
    { image: "https://i.pinimg.com/originals/99/ee/d3/99eed3289b336e484f5b4bb182630d36.gif", title: "BUCK", description: "BUCK is a global creative company that brings brands, stories, and experiences to life through art, design, and technology." },
    { image: "https://i.pinimg.com/originals/a3/7e/48/a37e48e6e5e0edb1b2ffbee6a73fbd59.gif", title: "Lights 0NN", description: "Description of artwork 5" },
    { image: "https://i.pinimg.com/originals/91/04/aa/9104aa39381fec0c1fb54346e3700ddc.gif", title: "Freeform Portland", description: "Description of artwork 6" },
    { image: "https://i.pinimg.com/564x/e1/12/ce/e112cec116c02f617870067cbed7649a.jpg", title: "Richard Brandão", description: "69 Artworks by Richard Brandão, Saatchi Art Artist" },
    { image: "https://i.pinimg.com/originals/48/3f/be/483fbebfa30d9d506715307a9de897b1.gif", title: "Pictoplasma", description: "I'm watching you! Pictoplasma #CharacterStareDown entry" },
    { image: "https://i.pinimg.com/originals/91/56/64/9156644ae1ddcbc1756330c5f25ef067.gif", title: "A-na5/ｱ_ﾅ", description: "Flowtype" },
  ];

  const regularArtworks = [
    { image: "https://i.pinimg.com/enabled_hi/564x/5d/bd/00/5dbd006f8a7323e95215c70712e79d29.jpg", title: "Muted f-1", description: "Speed of green" },
    { image: "https://i.pinimg.com/enabled_hi/564x/ff/72/9d/ff729d47356e1c9d83eb210318a3b2a8.jpg", title: "Perspective", description: "Soy tantas personas, emociones susurrando un mismo nombre" },
    { image: "https://i.pinimg.com/enabled_hi/564x/dd/9e/6b/dd9e6b3417414eff234c837202bc02ca.jpg", title: "A-I", description: "AI theme" },
    { image: "https://i.pinimg.com/736x/8b/d7/b8/8bd7b883b210468739db1bff92822dbf.jpg", title: "", description: "Description of artwork 4" },
    { image: "https://i.pinimg.com/736x/0a/18/27/0a1827e9238aaf70a295153757c1a393.jpg", title: "Smoking Kills 1", description: "smoking kills michael schumacher" },
    { image: "https://i.pinimg.com/enabled_hi/564x/ab/68/86/ab68861f180d341161e5e69082b9d974.jpg", title: "Smoking Kills 2", description: "Smoking kills" },
    { image: "https://i.pinimg.com/enabled_hi/564x/12/c2/25/12c225b47a96bf8b2fdb62811caff5a3.jpg", title: "911", description: "Description of artwork 7" },
    { image: "https://i.pinimg.com/736x/6b/37/9b/6b379bbc075111aa52bf6f06f1bfc0ed.jpg", title: "Halftone", description: "close-up of stacked halftone overlays on a BMW" },
    { image: "https://i.pinimg.com/enabled_hi/564x/9c/fe/01/9cfe017fd0ad40807f79fead11415e3d.jpg", title: "Speedster posterwork", description: "Speedster" },
  ];

  return (
    <div>
      <Container>

      <Accordion  data-bs-theme="dark" className="justify-content-center mb-5 mt-5 wow zoomIn" >
        <Accordion.Item eventKey="0">
          <Accordion.Header className="unbounded-uniquifier-header">Artwork Sections</Accordion.Header>
          <Accordion.Body>
            <nav>
              <ul>
                <li>
                  <a href="#animated-artworks" className="unbounded-uniquifier-header wow fadeInLeft" data-wow-delay="0.6s" data-wow-duration="1s">Animated Artworks</a>
                </li>
                <li>
                  <a href="#static-artworks" className="unbounded-uniquifier-header wow fadeInLeft" data-wow-delay="0.4s" data-wow-duration="1s">Static Artworks</a>
                </li>
                <li>
                  <a href="#add-artwork" className="unbounded-uniquifier-header wow fadeInLeft" data-wow-delay="0.2s" data-wow-duration="1s">Submit Artwork</a>
                </li>
              </ul>
            </nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      </Container>
      <Container className="justify-content-center mb-5 mt-5 ">
        <Row className="mb-5">
          {/* Animated Artworks */}
          <section id="animated-artworks" className="wow fadeInLeft" data-wow-delay="0.4s" data-wow-duration="1s">
            <h1 className="unbounded-uniquifier-h1">Animated Artworks</h1>
            <hr />
            {renderArtworkGrid(animatedArtworks)}
          </section>
        </Row>

        <Row className="mb-5">
          {/* Regular Artworks */}
          <section id="static-artworks" className="wow fadeInLeft" data-wow-delay="0.2s" data-wow-duration="1s">
            <h1 className="unbounded-uniquifier-h1">Static Artworks</h1>
            <hr />
            {renderArtworkGrid(regularArtworks)}
          </section>
        </Row>

        <Row>
          {/* Artwork Addition Form in a Styled Card */}
          <section id="add-artwork" className="wow fadeInLeft">
            <h1 className="unbounded-uniquifier-h1">Add your own pieces</h1>
            <hr />
            <Col xs={12} md={6} className="wow fadeInLeft mt-5" data-wow-duration="1s">
              <Card className="card-color text-white" style={{ boxShadow: "0 0px 15px rgba(0, 0, 0, 0.5)" }}>
                <Card.Body className="p-5">
                  <Card.Title className="contact-card mb-4 unbounded-uniquifier-h1">Submit Your Artwork</Card.Title>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName" className="mb-3">
                      <Form.Label className="unbounded-uniquifier-h1">Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formEmail" className="mb-3">
                      <Form.Label className="unbounded-uniquifier-h1">Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formImageUrl" className="mb-3">
                      <Form.Label className="unbounded-uniquifier-h1">Artwork (JPEG/Weblink)</Form.Label>
                      <Form.Control
                        type="url"
                        placeholder="Enter image URL"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formOption" className="mb-3">
                      <Form.Label className="unbounded-uniquifier-h1">Type(Animated/Static)</Form.Label>
                      <Form.Select
                        placeholder="Select type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        >
                        {/* <option value="">Select type</option> Placeholder option */}
                        <option value="animated">Animated</option>
                        <option value="static">Static</option>
                      </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="unbounded-uniquifier-h1">
                      Submit Artwork
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </section>
        </Row>
      </Container>
    </div>
  );
}

export default Artwork;
