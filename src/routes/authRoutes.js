const express = require("express")
const authRouter = express.Router()
const {registerValidator, loginValidator} = require("../validators/authValidator")
const validate = require("../middleware/validationMiddleware")
const {registerUser, loginUser, getCurrentUser, logoutUser} = require("../controller/authController")
const auth = require("../middleware/authMiddleware")



/** 
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account using name, emailId and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - emailId
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rahul
 *               emailId:
 *                 type: string
 *                 example: rahul@gmail.com
 *               password:
 *                 type: string
 *                 example: Rahul@123
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Validation failed or user already exists.
 *       500:
 *         description: Internal server error.
 */

authRouter.post('/register', registerValidator, validate, registerUser)
authRouter.post('/login', loginValidator, validate, loginUser)
authRouter.get('/me', auth, getCurrentUser)
authRouter.post('/logout', logoutUser)



module.exports = authRouter