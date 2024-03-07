const express = require('express');
const routes = require('./routes'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}`);
});
