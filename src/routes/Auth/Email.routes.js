import { Router } from "express";

import Email from "../../controller/Auth/Email.Controller.js";

const router = Router();

/**
 * @swagger
 *
 * tags:
 *      name: Auth
 *      description: Auth endpoints
 *
 */

/**
 * @swagger
 * /forgotPassword:
 *  post:
 *      summary: Request password recovery
 *      tags: [Auth]
 */

router.post("/forgotPassword", Email.forgotPassword);

/**
 * @swagger
 * /resetPassword/:token:
 *  post:
 *      summary: Reset password
 *      tags: [Auth]
 */

router.post("/resetPassword/:token", Email.resetPassword);

export default router;
