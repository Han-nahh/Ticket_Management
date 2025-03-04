import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FooterComponent = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={4} className="text-center text-md-left">
            <p>&copy; {new Date().getFullYear()} Ticketing System. All Rights Reserved.</p>
          </Col>
          <Col md={4} className="text-center text-md-center">
            <p>Phone: +251 967835797</p>
            <p>Email: <a href="mailto:hannatesfaye11@gmail.com" className="text-white">hannatesfaye11@gmail.com</a></p>
          </Col>
          <Col md={4} className="text-center text-md-right">
            <a href="/privacy-policy" className="text-white">
              Privacy Policy
            </a> |{' '}
            <a href="/terms-of-use" className="text-white">
              Terms of Use
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default FooterComponent;
