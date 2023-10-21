const express = require('express');
const rotas = require('./rotas')
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json')

const app = express();

app.use(express.json());

app.use("/api-docks", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(rotas)

module.exports = app;