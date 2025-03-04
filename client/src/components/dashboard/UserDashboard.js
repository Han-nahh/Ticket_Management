import React, { Component } from 'react';
import { Card, Button, Table, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 

class UserDashboard extends Component {
  state = {
    tickets: [],
    error: '',
    loading: true,
    sortConfig: { key: 'title', direction: 'ascending' }
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
      const userId = decoded.id;
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/tickets?userId=${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data);

      this.setState({ tickets: response.data, loading: false });
    } catch (error) {
      this.setState({ error: 'Failed to fetch tickets. Please try again later.', loading: false });
    }
  };


  handleSort = (key) => {
    const { tickets, sortConfig } = this.state;
    let direction = 'ascending';

    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedTickets = [...tickets].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    this.setState({
      tickets: sortedTickets,
      sortConfig: { key, direction }
    });
  };

  render() {
    const { tickets, error, loading, sortConfig } = this.state;

    return (
      <div className="user-dashboard mt-5">
        <Card className="shadow-lg">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h4>User Dashboard</h4>
            <Link to="/create-ticket">
              <Button variant="success">Create New Ticket</Button>
            </Link>
          </Card.Header>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? (
              <div>Loading...</div>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th onClick={() => this.handleSort('title')} style={{ cursor: 'pointer' }}>
                      Title {sortConfig.key === 'title' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                    </th>
                    <th onClick={() => this.handleSort('description')} style={{ cursor: 'pointer' }}>
                      Description {sortConfig.key === 'description' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                    </th>
                    <th onClick={() => this.handleSort('status')} style={{ cursor: 'pointer' }}>
                      Status {sortConfig.key === 'status' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket._id}>
                      <td>{ticket.title}</td>
                      <td>
                        {ticket.description.length > 50
                          ? ticket.description.slice(0, 50) + '...'
                          : ticket.description}
                      </td>
                      <td>{ticket.status}</td>
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

export default UserDashboard;
