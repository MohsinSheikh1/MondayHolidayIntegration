const router = require("express").Router();

router.get("/", (req, res) => {
  res.json(getHealth());
});

router.get("/health", (req, res) => {
  res.json(getHealth());
});

function getHealth() {
  return {
    status: "OK",
    message: "Healthy",
  };
}

module.exports = router;
