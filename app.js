require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const healthRoutes = require("./routes/health");

const { PORT: port } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(healthRoutes);

app.listen(port, () => {
  console.log(`The integration is running on port: ${port}`);
});
