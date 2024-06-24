const { EnvironmentVariablesManager } = require("@mondaycom/apps-sdk");

const secretManager = new EnvironmentVariablesManager();

const DEVELOPMENT_ENV = "development";
const NODE_ENV = "NODE_ENV";

const isDevelopmentEnv = () => {
  const currentEnv = (getSecret(NODE_ENV) || DEVELOPMENT_ENV).toLowerCase();
  return currentEnv === "development";
};

const getEnv = () => (getSecret(NODE_ENV) || DEVELOPMENT_ENV).toLowerCase;

const getSecret = (secretKey, options = {}) => {
  const secret = secretManager.get(secretKey, options);
  return secret;
};

module.exports = {
  getSecret,
  isDevelopmentEnv,
  getEnv,
};
