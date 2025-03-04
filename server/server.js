const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const ticketRoutes = require("./routes/ticketRoute");
const errorHandler = require("./utils/errorHandler");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
dotenv.config();

const app = express();
app.use(cors());
app.use(cors({
    origin: '*', 
  }));
  app.use(express.json()); 
connectDB();

const options = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "User and Ticket Management API",
        version: "1.0.0",
        description: "API documentation for user authentication and ticket management",
        contact: {
          name: "Support",
          email: "support@example.com"
        }
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT"
          }
        }
      },
      security: [
        {
          BearerAuth: []
        }
      ],
    },
    apis: ["./routes/authRoute.js", "./routes/ticketRoute.js"],
  };
  
  const specs = swaggerJsdoc(options);
  
  // Set up Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
