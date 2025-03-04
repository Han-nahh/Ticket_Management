# Ticketing System Frontend

Welcome to the **Ticketing System Frontend** repository. This application serves as the front-end for a customer support ticket management platform, allowing both customers and admins to manage and track support tickets.

## Features

- **User Authentication**: Login and Sign-up functionality for users and admins.
- **Responsive Layout**: The platform is fully responsive, supporting all device sizes.
- **Real-time Support**: Customers can create and track tickets, while admins can manage and resolve them.
- **User Dashboard**: Different dashboards for customers and admins to manage their tickets.
- **Admin Dashboard**: Admins can manage user tickets and monitor system activity.

## Technologies Used

- **React.js**: Front-end framework for building the user interface.
- **React Bootstrap**: UI components library for faster styling and responsiveness.
- **React Router**: For handling navigation within the application.
- **Tailwind CSS**: Utility-first CSS framework for custom styles.
- **React Animations (animate.css)**: For smooth animations throughout the app.

---

## Task: Build a Role-Based Ticketing System

### Objective:

Develop a basic role-based support ticketing system where users can create tickets and admins can manage them.

### Requirements:

#### ✅ Backend (Node.js, MongoDB)
- **User Authentication**: JWT-based login & signup.
- **User Roles**: 
  - **User**: Creates tickets.
  - **Admin**: Manages tickets.

#### Endpoints Required:
- `POST /signup` → Register users (with role selection).
- `POST /login` → Authenticate users and return a JWT token.
- `POST /tickets` → Create a support ticket (title, description, status).
  
  **GET /tickets**:
  - Users see only their own tickets.
  - Admins see all tickets.
  
- `PUT /tickets/:id` → Admins can update ticket status (e.g., Open, In Progress, Closed).

---

#### ✅ Frontend (React.js - Preferably Class-Based Components)

**Pages:**
- **Login & Signup Pages**: Forms for user authentication.

**User Dashboard**:
- List of the user's own support tickets.
- A form to create new tickets.

**Admin Dashboard**:
- A list of all tickets with options to update their status.

**Routing**:
- Use **React Router** for navigation between pages.

#### ✅ Additional Requirements:
- **Authentication & Authorization**: Users must be authenticated using JWT.
- **Role-Based Access Control**: Only admins can manage all tickets.
- **State Management**: Use **Redux** or **Context API** for managing global state.
- **Basic UI Styling**: Tailwind CSS or Bootstrap for styling the UI components.

---