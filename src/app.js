import expresss from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {options} from './swaggerOptions.js';

 
const specs = swaggerJSDoc(options);


import Market from './routes/Mercado.routes.js';

const app = expresss();

// Settings
app.set("port", process.env.PORT || 3000);

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));


app.use('/api', Market);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));


export default app;