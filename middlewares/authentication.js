const jwt = require("jsonwebtoken");
const { Logger } = require("@mondaycom/apps-sdk");
const { getSecret } = require("../helpers/helpers");

const MONDAY_SIGNING_SECRET = "MONDAY_SIGNING_SECRET";

async function authenticationMiddleware(req, res, next) {
  const logTag = "AuthorizationMiddleware";
  const logger = new Logger(logTag);
  try {
    let { authorization } = req.headers;

    if (!authorization && req.query) {
      authorization = req.query.token;
    }

    const { accountId, userId, backToUrl, shortLivedToken } = jwt.verify(
      authorization,
      getSecret(MONDAY_SIGNING_SECRET)
    );

    req.session = {
      accountId,
      userId,
      backToUrl,
      shortLivedToken,
    };
    next();
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: "Not authenticated" });
  }
}

module.exports = {
  authenticationMiddleware,
};
