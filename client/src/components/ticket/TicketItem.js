import React from 'react';
import { ListGroupItem, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TicketItem = ({ ticket }) => {
  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center">
      <div>
        <h5>{ticket.title}</h5>
        <p className="mb-1">Created By: {ticket.createdBy}</p>
        <Badge bg={ticket.status === 'Open' ? 'warning' : 'success'}>{ticket.status}</Badge>
      </div>
      <Link to={`/ticket/${ticket.id}`}>
        <Button variant="outline-primary" size="sm">View Details</Button>
      </Link>
    </ListGroupItem>
  );
}

export default TicketItem;
