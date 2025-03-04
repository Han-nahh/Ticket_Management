const express = require("express");
const { signup, login } = require("../controllers/authController");
const router = express.Router();

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user with the provided details (name, email, password, role).
 *     parameters:
 *       - name: name
 *         in: body
 *         required: true
 *         description: User's name
 *         schema:
 *           type: string
 *       - name: email
 *         in: body
 *         required: true
 *         description: User's email address
 *         schema:
 *           type: string
 *       - name: password
 *         in: body
 *         required: true
 *         description: User's password
 *         schema:
 *           type: string
 *       - name: role
 *         in: body
 *         required: true
 *         description: User's role (admin/user)
 *         schema:
 *           type: string
 *           enum:
 *             - user
 *             - admin
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Bad request (e.g. user already exists)
 *       500:
 *         description: Internal server error
 */
router.post("/signup", signup);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     description: Logs in a user with email and password to get a JWT token.
 *     parameters:
 *       - name: email
 *         in: body
 *         required: true
 *         description: User's email address
 *         schema:
 *           type: string
 *       - name: password
 *         in: body
 *         required: true
 *         description: User's password
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully logged in and token returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post("/login", login);

module.exports = router;
