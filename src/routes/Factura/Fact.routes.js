import { Router } from "express";

import Market from "../../controller/Factura/Fact.controller.js";

const router = Router();

/**
 * @swagger
 *
 * tags:
 *      name: Factura
 *      description: Factura endpoints
 *
 */

/**
 * @swagger
 * /facturasMercado:
 *  get:
 *      summary: Get all facturas
 *      tags: [Factura]
 */

router.get("/facturasMercado", Market.getAllfacturasMercado);

/**
 * @swagger
 * /facturasMercado:
 *  post:
 *      summary: Create factura
 *      tags: [Factura]
 */

router.post("/facturasMercado", Market.createFactura);

export default router;
