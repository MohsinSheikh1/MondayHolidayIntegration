const router = require("express").Router();
const mondayRoutes = require("./monday");

router.use("/monday", mondayRoutes);

router.get("/", (req, res) => {
  res.json(getHealth());
});

router.get("/health", (req, res) => {
  res.json(getHealth());
});

function getHealth() {
  logger.info("Checking health");
  return {
    status: "OK",
    message: "Healthy",
  };
}

module.exports = router;
