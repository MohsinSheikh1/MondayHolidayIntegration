const mondayService = require("../services/monday-service");
const formattingService = require("../services/formatting-service");
//import calculation service here

async function executeAction(req, res) {
  const { shortLivedToken } = req.session;
  const { payload } = req.body;

  try {
    const { inputFields } = payload;
    const { startColumnId, endColumnId, boardId, resultColumnId, itemId } =
      inputFields;

    const holidayBoardItems = JSON.parse(
      JSON.stringify(
        await mondayService.getBoardItems(shortLivedToken, boardId)
      )
    );

    //empty array if all items date's are not set or no items in holiday board
    const dateColumnValues =
      formattingService.getDateColumnValues(holidayBoardItems);

    //can be undefined if date is not set
    const startDateColumnValue = await mondayService.getDateFromDateColumn(
      shortLivedToken,
      itemId,
      startColumnId
    );

    //can be undefined if date is not set
    const endDateColumnValue = await mondayService.getDateFromDateColumn(
      shortLivedToken,
      itemId,
      endColumnId
    );

    //handle situation when one or both startDate and endDate are not set
    //calculate working days
    //make mutations based on results in monday board
    //handle errors

    console.log(dateColumnValues);
    console.log(startDateColumnValue);
    console.log(endDateColumnValue);

    return res.status(200).send({});
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "internal server error" });
  }
}

module.exports = {
  executeAction,
};
