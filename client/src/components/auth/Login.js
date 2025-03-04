import React, { Component } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { loginUser } from '../../utils/api'; 
import { jwtDecode } from 'jwt-decode'; 

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    redirectToDashboard: false
  };

  handleSubmit = async (e) => {
    e.preventDefault();
  
    const { email, password } = this.state;
  
    if (!email || !password) {
      this.setState({ error: 'Please fill in all fields.' });
      return;
    }
  
    try {
      const token = await loginUser(email, password);
  
      if (token) {
        const decodedUser = jwtDecode(token);
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(decodedUser));
  
        if (decodedUser.role === 'admin') {
          this.setState({ redirectToDashboard: '/admin-dashboard' });
        } else {
          this.setState({ redirectToDashboard: '/user-dashboard' });
        }
      } else {
        this.setState({ error: 'Invalid credentials. Please try again.' });
      }
    } catch (error) {
      this.setState({ error: 'Login failed. Please try again later.' });
    }
  };
  

  render() {
    if (this.state.redirectToDashboard) {
      return <Navigate to={this.state.redirectToDashboard} />;
    }
  
    return (
      <div className="login-container d-flex justify-content-center align-items-center min-vh-100">
        <Card className="shadow-lg p-4" style={{ width: '30rem' }}>
          <h2 className="text-center mb-4">Login</h2>
          {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-4">
              Login
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Login;
