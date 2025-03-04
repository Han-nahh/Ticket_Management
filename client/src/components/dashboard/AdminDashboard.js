import React, { Component } from 'react';
import { Card, Button, Table, Alert } from 'react-bootstrap';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

class AdminDashboard extends Component {
  state = {
    tickets: [],
    error: '',
    loading: true,
    sortBy: 'title',  
    sortOrder: 'asc', 
  };

  componentDidMount() {
    this.fetchTickets();
  }

  fetchTickets = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.setState({ error: 'Unauthorized access. Please login.', loading: false });
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== 'admin') {
        this.setState({ error: 'Access denied. Admins only.', loading: false });
        return;
      }

      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/tickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      this.setState({ tickets: response.data, loading: false });
    } catch (error) {
      this.setState({ error: 'Failed to fetch tickets. Please try again later.', loading: false });
    }
  };

  handleStatusUpdate = async (ticketId, newStatus) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.setState({ error: 'Unauthorized access. Please login.' });
      return;
    }

    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/tickets/${ticketId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      this.fetchTickets();
    } catch (error) {
      this.setState({ error: 'Failed to update ticket status. Please try again later.' });
    }
  };

  sortTickets = (column) => {
    const { tickets, sortBy, sortOrder } = this.state;
    let newSortOrder = 'asc';

    if (sortBy === column && sortOrder === 'asc') {
      newSortOrder = 'desc';
    }

    const sortedTickets = [...tickets].sort((a, b) => {
      if (a[column] < b[column]) return sortOrder === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    this.setState({
      tickets: sortedTickets,
      sortBy: column,
      sortOrder: newSortOrder,
    });
  };

  render() {
    const { tickets, error, loading, sortBy, sortOrder } = this.state;

    return (
      <div className="admin-dashboard mt-5">
        <Card className="shadow-lg">
          <Card.Header>
            <h4>Admin Dashboard</h4>
          </Card.Header>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? (
              <div>Loading...</div>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th
                      onClick={() => this.sortTickets('title')}
                      style={{ cursor: 'pointer' }}
                    >
                      Title {sortBy === 'title' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                    </th>
                    <th
                      onClick={() => this.sortTickets('description')}
                      style={{ cursor: 'pointer' }}
                    >
                      Description {sortBy === 'description' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                    </th>
                    <th
                      onClick={() => this.sortTickets('status')}
                      style={{ cursor: 'pointer' }}
                    >
                      Status {sortBy === 'status' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket._id}>
                      <td>{ticket.title}</td>
                      <td>{ticket.description}</td>
                      <td>{ticket.status}</td>
                      <td>
                        <div className="d-flex">
                          {ticket.status !== 'Closed' && (
                            <Button
                              variant="warning"
                              size="sm"
                              onClick={() => this.handleStatusUpdate(ticket._id, 'In Progress')}
                              className="me-2"
                            >
                              In Progress
                            </Button>
                          )}
                          {ticket.status === 'In Progress' && (
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => this.handleStatusUpdate(ticket._id, 'Closed')}
                            >
                              Resolve
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default AdminDashboard;
