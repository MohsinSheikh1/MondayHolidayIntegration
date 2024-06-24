require("dotenv").config();
const { getSecret, isDevelopmentEnv, getEnv } = require("./helpers/helpers");
const express = require("express");
const bodyParser = require("body-parser");
const healthRoutes = require("./routes/health");
const { Logger } = require("@mondaycom/apps-sdk");

const logTag = "ExpressServer";
const PORT = "PORT";
// const SERVICE_TAG_URL = "SERVICE_TAG_URL";

const logger = new Logger(logTag);
const currentPort = getSecret(PORT); // Port must be 8080 to work with monday code
// const currentUrl = getSecret(SERVICE_TAG_URL);
// const { PORT: port } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(healthRoutes);

app.listen(currentPort, () => {
  if (isDevelopmentEnv()) {
    logger.info(`app running locally on port ${currentPort}`);
  } else {
    logger.info(
      `up and running listening on port: ${currentPort}`,
      "server_runner",
      {
        env: getEnv(),
        port: currentPort,
        // url: `https://${currentUrl}`,
      }
    );
  }
});
