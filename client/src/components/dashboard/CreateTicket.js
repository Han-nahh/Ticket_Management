import React, { Component } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Navigate } from 'react-router-dom'; 
import axios from 'axios';

class CreateTicket extends Component {
  state = {
    title: '',
    description: '',
    error: '',
    redirectToDashboard: false, 
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');

    if (!this.state.title || !this.state.description) {
      this.setState({ error: 'Please fill in both fields' });
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/tickets`,
        { title: this.state.title, description: this.state.description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      this.setState({ title: '', description: '', redirectToDashboard: true });
    } catch (error) {
      this.setState({ error: 'Failed to create ticket. Please try again later.' });
    }
  };

  render() {
    if (this.state.redirectToDashboard) {
      return <Navigate to="/user-dashboard" />; 
    }

    return (
      <div className="create-ticket-container d-flex justify-content-center align-items-center min-vh-100">
        <Card className="shadow-lg p-4 rounded-lg" style={{ width: '100%', maxWidth: '400px' }}>
          <h2 className="text-center mb-4">Create New Ticket</h2>
          {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Ticket Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ticket title"
                value={this.state.title}
                onChange={(e) => this.setState({ title: e.target.value })}
                className="mb-3"
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter ticket description"
                value={this.state.description}
                onChange={(e) => this.setState({ description: e.target.value })}
                className="mb-3"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3 py-2">
              Create Ticket
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}

export default CreateTicket;
