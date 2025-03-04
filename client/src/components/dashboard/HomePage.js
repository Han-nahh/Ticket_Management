import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page bg-gradient-to-r from-blue-500 to-teal-500 min-h-screen">
      <Container className="py-5 text-center">
        <Row className="justify-content-center mb-5">
          <Col md={8}>
            <h1 className="display-4 font-bold mb-4 animate__animated animate__fadeIn animate__delay-1s">
              Welcome to the Ultimate Support System
            </h1>
            <p className="lead text-lg mb-4 animate__animated animate__fadeIn animate__delay-2s">
              Our platform provides top-notch support to customers and admins alike. Easily manage tickets, get real-time updates, and provide the best customer experience.
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center mb-5">
          <Col md={10}>
            <h2 className="text-3xl font-bold mb-4 animate__animated animate__fadeIn animate__delay-5s">Features</h2>
            <Row>
              <Col md={4} className="mb-4">
                <Card className="shadow-lg text-center transform hover:scale-105 transition duration-300 ease-in-out">
                  <Card.Body>
                    <h4 className="card-title">Ticket Management</h4>
                    <p>Efficiently manage and track customer support tickets from submission to resolution.</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-4">
                <Card className="shadow-lg text-center transform hover:scale-105 transition duration-300 ease-in-out">
                  <Card.Body>
                    <h4 className="card-title">Real-Time Support</h4>
                    <p>Our platform enables real-time communication for immediate assistance and updates.</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-4">
                <Card className="shadow-lg text-center transform hover:scale-105 transition duration-300 ease-in-out">
                  <Card.Body>
                    <h4 className="card-title">User-Friendly Interface</h4>
                    <p>Easy-to-use interface designed for both admins and customers to navigate effortlessly.</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="justify-content-center mb-5">
          <Col md={10}>
            <h2 className="text-3xl font-bold mb-4 animate__animated animate__fadeIn animate__delay-6s">What Our Users Say</h2>
            <Row>
              <Col md={4} className="mb-4">
                <div className="p-4 border rounded shadow-lg text-center">
                  <p>"This support system has transformed the way we manage customer inquiries. So efficient!"</p>
                  <small>- Hanna Tesfaye, Customer</small>
                </div>
              </Col>
              <Col md={4} className="mb-4">
                <div className="p-4 border rounded shadow-lg text-center">
                  <p>"As an admin, I love how intuitive the platform is. It saves us so much time!"</p>
                  <small>- Sami Wolde, Admin</small>
                </div>
              </Col>
              <Col md={4} className="mb-4">
                <div className="p-4 border rounded shadow-lg text-center">
                  <p>"The ticket tracking is seamless, and the real-time chat feature is a game-changer!"</p>
                  <small>- Eldana Tadesse, Customer</small>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="justify-content-center mt-5">
          <Col md={8}>
            <div className="p-5 bg-dark rounded shadow-lg text-center">
              <h2 className="text-3xl text-white font-semibold mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-white mb-4">Join our platform and experience seamless customer support management today!</p>
              <div className="d-flex justify-content-center">
                <Link to="/signup" className="mx-2">
                  <Button variant="success" size="lg">Sign Up Now</Button>
                </Link>
                <Link to="/login" className="mx-2">
                  <Button variant="outline-light" size="lg">Login</Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
