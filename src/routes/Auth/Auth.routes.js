import { Router } from "express";

import Auth from "../../controller/Auth/Auth.Controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *      name: Auth
 *      description: Auth endpoints
 *
 */

/**
 * @swagger
 * /register:
 *  post:
 *      summary: Register user
 *      tags: [Auth]
 */
router.post("/register", Auth.register);

/**
 * @swagger
 * /login:
 *  post:
 *      summary: Login user
 *      tags: [Auth]
 */

router.post("/login", Auth.login);

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Get all users
 *      tags: [Auth]
 */
router.get("/users", Auth.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *  get:
 *      summary: Get user by id
 *      tags: [Auth]
 */
router.get("/users/:id", Auth.getUserById);

/**
 * @swagger
 * /users/{id}:
 *  put:
 *      summary: Update user by id
 *      tags: [Auth]
 */
router.put("/users/:id", Auth.updateUser);

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *      summary: Delete user by id
 *      tags: [Auth]
 */
router.delete("/users/:id", Auth.deleteUser);

// obtener usuario por by token
/**
 * @swagger
 * /user:
 *  get:
 *      summary: Get user by token
 *      tags: [Auth]
 */
router.get("/user", Auth.getUserByToken);

export default router;
