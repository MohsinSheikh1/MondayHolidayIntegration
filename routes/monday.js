const router = require("express").Router();

//import authentication middleware here
const mondayController = require("../controllers/monday-controller");

router.post("/monday/execute_action", mondayController.executeAction);

module.exports = router;
