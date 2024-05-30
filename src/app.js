import expresss from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { options } from "./swaggerOptions.js";

const specs = swaggerJSDoc(options);

import Market from "./routes/Market/Mercado.routes.js";
import Auth from "./routes/Auth/Auth.routes.js";
import Email from "./routes/Auth/Email.routes.js";
import Invoice from "./routes/Factura/Fact.routes.js";

const app = expresss();

// Settings
app.set("port", process.env.PORT || 3001);

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/api", Market);
app.use("/auth", Auth);
app.use("/email", Email);
app.use("/invoice", Invoice);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

export default app;
