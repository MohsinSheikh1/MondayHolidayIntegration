const mondayService = require("../services/monday-service");
//import calculation service here

async function executeAction(req, res) {
  const { shortLivedToken } = req.session;
  const { payload } = req.body;

  try {
    const { inputFields } = payload;
    const { startDate, endDate, holidayBoardId, resultColumnId } = inputFields;

    const boardItems = await mondayService.getBoardItems(
      shortLivedToken,
      holidayBoardId
    );

    console.log(`${startDate} ---- ${endDate} ---- ${resultColumnId}`);
    console.log("------");
    console.log(`${boardItems}`);
    return res.status(200).send({});
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "internal server error" });
  }
}

module.exports = {
  executeAction,
};
