import React, { Component } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

class Header extends Component {
  handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login'; 
  };

  handleTicketingClick = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      if (user.role === 'admin') {
        window.location.href = '/admin-dashboard';
      } else {
        window.location.href = '/user-dashboard'; 
      }
    } else {
      window.location.href = '/'; 
    }
  };

  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand 
            as={Link} 
            to="#" 
            className="fw-bold fs-4" 
            onClick={this.handleTicketingClick}
          >
            🎫 Ticketing System
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav" className="justify-content-end">
            <Nav>
              <Button 
                variant="outline-light" 
                className="fw-semibold px-3 py-2" 
                onClick={this.handleLogout}
              >
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
