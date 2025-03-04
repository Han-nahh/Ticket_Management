const express = require("express");
const { createTicket, getTickets, updateTicketStatus } = require("../controllers/ticketController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Create a new ticket
 *     description: Authenticated users can create a new ticket by providing a title and description.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: title
 *         in: body
 *         required: true
 *         description: The title of the ticket
 *         schema:
 *           type: string
 *       - name: description
 *         in: body
 *         required: true
 *         description: The description of the ticket
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Ticket created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized (Invalid JWT token)
 *       500:
 *         description: Internal server error
 */
router.post("/", authMiddleware, createTicket);

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Get all tickets for the logged-in user
 *     description: Retrieves all tickets for the logged-in user (admin can see all tickets).
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of tickets for the logged-in user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 *                   user:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *       401:
 *         description: Unauthorized (Invalid JWT token)
 *       500:
 *         description: Internal server error
 */
router.get("/", authMiddleware, getTickets);

/**
 * @swagger
 * /api/tickets/{id}:
 *   put:
 *     summary: Update a ticket's status
 *     description: Admins can update a ticket's status (e.g., from "Open" to "In Progress").
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the ticket
 *         schema:
 *           type: string
 *       - name: status
 *         in: body
 *         required: true
 *         description: The new status of the ticket
 *         schema:
 *           type: string
 *           enum:
 *             - Open
 *             - In Progress
 *             - Closed
 *     responses:
 *       200:
 *         description: Ticket status updated successfully
 *       400:
 *         description: Bad request (e.g., invalid ticket ID)
 *       401:
 *         description: Unauthorized (Invalid JWT token)
 *       403:
 *         description: Forbidden (Admin only)
 *       500:
 *         description: Internal server error
 */
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), updateTicketStatus);

module.exports = router;
