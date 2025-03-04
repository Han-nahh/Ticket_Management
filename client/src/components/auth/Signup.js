import React, { Component } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { signup } from '../../utils/api';

class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    role: 'user', // default role is 'user'
    error: '',
    redirectToDashboard: false,
    passwordStrength: '',
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    
    if (this.state.name && this.state.email && this.state.password) {
      // Check if password is strong enough (either medium or strong)
      if (this.state.passwordStrength === 'Weak') {
        this.setState({ error: 'Password is not strong enough. Please follow the requirements.' });
        return;
      }

      try {
        const response = await signup(this.state.name, this.state.email, this.state.password, this.state.role);
        
        if (response) {
          this.setState({ redirectToDashboard: true });
        } else {
          this.setState({ error: 'Signup failed. Please try again.' });
        }
      } catch (error) {
        this.setState({ error: 'Something went wrong. Please try again.' });
      }
    } else {
      this.setState({ error: 'Please fill in all fields' });
    }
  };

  handlePasswordChange = (e) => {
    const password = e.target.value;
    this.setState({ password });

    // Check password strength
    const strength = this.checkPasswordStrength(password);
    this.setState({ passwordStrength: strength });
  };

  checkPasswordStrength = (password) => {
    const strongPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const mediumPassword = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    if (strongPassword.test(password)) {
      return 'Strong';
    } else if (mediumPassword.test(password)) {
      return 'Medium';
    } else {
      return 'Weak';
    }
  };

  render() {
    if (this.state.redirectToDashboard) {
      return <Navigate to="/login" />;
    }

    return (
      <div className="signup-container d-flex justify-content-center align-items-center min-vh-100">
        <Card className="shadow-lg p-4" style={{ width: '30rem' }}>
          <h2 className="text-center mb-4">Sign Up</h2>
          {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mt-3">
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
                onChange={this.handlePasswordChange}
              />
              <Form.Text className="text-muted">
                {this.state.passwordStrength === 'Strong' && <span className="text-success">Password strength: Strong</span>}
                {this.state.passwordStrength === 'Medium' && <span className="text-warning">Password strength: Medium</span>}
                {this.state.passwordStrength === 'Weak' && <span className="text-danger">Password strength: Weak</span>}
              </Form.Text>
            </Form.Group>

            {/* Add role selection dropdown */}
            <Form.Group controlId="formRole" className="mt-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={this.state.role}
                onChange={(e) => this.setState({ role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-4">
              Sign Up
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Signup;
