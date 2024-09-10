import { Router } from "express";
import { registerUserMiddleware } from "../middlewares/user.middlewares";
import { registerUserController } from "../controllers/user.controllers";

const userRouter = Router();

/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     summary: Register a new user
 *     description: API to register a new user with required details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: Password123!
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request (validation errors or missing data)
 */

userRouter.post("/register", registerUserMiddleware, registerUserController);

export default userRouter;
