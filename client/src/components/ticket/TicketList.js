import React, { Component } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import TicketItem from './TicketItem';

class TicketList extends Component {
  state = {
    tickets: [
      { id: 1, title: 'Login Issue', status: 'Open', createdBy: 'John Doe' },
      { id: 2, title: 'App Crash', status: 'Resolved', createdBy: 'Jane Doe' },
    ]
  };

  render() {
    return (
      <div className="ticket-list">
        <Card className="shadow-lg">
          <Card.Header>
            <h4>All Tickets</h4>
          </Card.Header>
          <Card.Body>
            <ListGroup>
              {this.state.tickets.map((ticket) => (
                <TicketItem key={ticket.id} ticket={ticket} />
              ))}
            </ListGroup>
            <Button variant="success" className="w-100 mt-3">Create New Ticket</Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default TicketList;
