import { Router } from "express";

import Market from "../../controller/Market/Mercado.controller.js";

const router = Router();

//* localidades

/**
 * @swagger
 * tags:
 *  name: localidades
 *  description: localidades endpoints
 *
 */

/**
 * @swagger
 * /localidades:
 *  get:
 *      summary: Get all localidades
 *      tags: [localidades]
 */

router.get("/localidades", Market.getAllLocalidades);

/**
 * @swagger
 * /localidades/{id}:
 *  get:
 *     summary: Get localidades by id
 *     tags: [localidades]
 */
router.get("/localidades/:id", Market.getLocalidadesById);

/**
 * @swagger
 * /newLocal:
 *  post:
 *      summary: create localidades
 *      tags: [localidades]
 */
router.post("/newLocal", Market.createLocalidades);

/**
 * @swagger
 * /updateLocal/{id}:
 *  put:
 *      summary: update localidades
 *      tags: [localidades]
 */
router.put("/updateLocal/:id", Market.updateLocalidades);

/**
 * @swagger
 * /deleteLocal/{id}:
 *  delete:
 *      summary: delete localidades
 *      tags: [localidades]
 */
router.delete("/deleteLocal/:id", Market.deleteLocalidades);

//* Mercados

/**
 * @swagger
 * tags:
 *  name: Markets
 *  description: Markets endpoints
 *
 */

/**
 * @swagger
 * /markets:
 *  get:
 *      summary: Get all markets
 *      tags: [Markets]
 *
 *
 */

router.get("/markets", Market.getAllMarkets);

/**
 * @swagger
 * /markets/{id}:
 *  get:
 *      summary: Get market by id
 *      tags: [Markets]
 */

router.get("/markets/:id", Market.getMarketById);

/**
 * @swagger
 * /newMarket:
 *   post:
 *      summary: create market
 *      tags: [Markets]
 */

router.post("/newMarket", Market.createMarket);

/**
 * @swagger
 * /updateMarket/{id}:
 *  put:
 *      summary: update market
 *      tags: [Markets]
 */

router.put("/updateMarket/:id", Market.updateMarket);

/**
 * @swagger
 * /deleteMarket/{id}:
 *  delete:
 *      summary: delete market
 *      tags: [Markets]
 */

router.delete("/deleteMarket/:id", Market.deleteMarket);

//* cruces de tablas

/**
 * @swagger
 * tags:
 *  name: Markets by localidad
 *  description: Markets by localidad endpoints
 *
 */

// consulta para mostrar todos los locales con su mercado
/**
 * @swagger
 * /marketsWithLocal:
 *  get:
 *     summary: Get all markets with localidades
 *     tags: [Markets by localidad]
 */
router.get("/marketsWithLocal", Market.getAllLocalidadesAndMarkets);

/**
 * @swagger
 * /marketsByLocalidad/{id}:
 *  get:
 *      summary: Get a markets with all localidad
 *      tags: [Markets by localidad]
 */

router.get("/marketsByLocalidad/:id", Market.getAllLocalidadesByMarketId);

export default router;
