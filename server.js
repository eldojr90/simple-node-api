const express = require('express');
const app = express();

const { PORT } = require('./config.json');
const routes = require('./src/routes');

// config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/', routes);

// running api
app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
