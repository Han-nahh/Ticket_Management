import React, { createContext, Component } from 'react';
import axios from 'axios';


const AuthContext = createContext();

class AuthProvider extends Component {
  state = {
    user: null,  
    isAuthenticated: false, 
    token: null,  
  };

 
  login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token } = response.data;

     
      localStorage.setItem('token', token);

     
      this.setState({
        user: { email }, 
        isAuthenticated: true,
        token: token,
      });
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  
  logout = () => {
    localStorage.removeItem('token');
    this.setState({ user: null, isAuthenticated: false, token: null });
  };

 
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
     
      this.setState({ isAuthenticated: true, token: token, user: { email: 'hanna@example.com' } });
    }
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          login: this.login,
          logout: this.logout,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export { AuthProvider, AuthContext };
