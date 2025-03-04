import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './components/dashboard/HomePage';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import UserDashboard from './components/dashboard/UserDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import CreateTicket from './components/dashboard/CreateTicket';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="d-flex flex-column min-vh-100"> 
          <Header />
          <Container className="flex-grow-1 mt-4"> 
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/create-ticket" element={<CreateTicket />} />
            </Routes>
          </Container>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
