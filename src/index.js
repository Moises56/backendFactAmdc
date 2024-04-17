import app from "./app.js";
import { PORT } from "./config.js";
// import "./databases.js";

app.listen(PORT);
console.log("Server on port", app.get("port"));