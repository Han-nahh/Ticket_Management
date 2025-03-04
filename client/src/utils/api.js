import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,  
  headers: {
    'Content-Type': 'application/json',
  },
});
console.log(process.env.REACT_APP_API_BASE_URL)

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export const signup = async (name, email, password, role) => {
  const userData = { name, email, password, role };

  console.log(userData);  

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/signup`, userData);
    console.log('Signup successful:', response.data);

    return response.data;  
  } catch (error) {
    console.error('Signup error:', error.response ? error.response.data : error.message);
    return null; 
  }
};


export const loginUser = async (email, password) => {
  try {
    
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, { email, password });

    
    if (response && response.data.token) {
      console.log('Login successful', response.data);  
      return response.data.token;  
    } else {
      console.error('No token received');
      return null;
    }
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error;  
  }
};

export const createTicket = async (title, description) => {
  try {
    const response = await api.post(`${process.env.REACT_APP_API_BASE_URL}/api/tickets`, { title, description });
    return response.data;
  } catch (error) {
    console.error('Ticket creation error', error);
    throw error;
  }
};

export const getTickets = async () => {
  try {
    const response = await api.get('${process.env.REACT_APP_API_BASE_URL}/api/tickets');
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Get tickets error', error);
    throw error;
  }
};

export const updateTicketStatus = async (ticketId, status) => {
  try {
    const response = await api.put(`${process.env.REACT_APP_API_BASE_URL}/api/tickets/${ticketId}`, { status });
    return response.data;
  } catch (error) {
    console.error('Update ticket error', error);
    throw error;
  }
};

export default api;
