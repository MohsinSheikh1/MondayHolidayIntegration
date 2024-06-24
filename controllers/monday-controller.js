const mondayService = require("../services/monday-service");
const formattingService = require("../services/formatting-service");
const calculationService = require("../services/calculation-service");

async function executeAction(req, res) {
  const { shortLivedToken } = req.session;
  const { payload } = req.body;

  try {
    const { inputFields } = payload;
    const {
      startColumnId,
      endColumnId,
      boardId,
      resultColumnId,
      itemId,
      currentBoardId,
    } = inputFields;

    const holidayBoardItems = JSON.parse(
      JSON.stringify(
        await mondayService.getBoardItems(shortLivedToken, boardId)
      )
    );

    //empty array if all items date's are not set or no items in holiday board
    const holidaysDates =
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
    if (!startDateColumnValue || !endDateColumnValue) {
      console.log("Start Date or End date was not set");
      return res.status(400).send({
        severityCode: 4000,
        notificationErrorTitle: "Invalid Start Or End Column Dates",
        notificationErrorDescription: `Either Start Or End Column Date was not found for the item id ${itemId}`,
        runtimeErrorDescription: `Automation failed to run because start date or end date column value was not found for item ${itemId} in board ${currentBoardId}`,
      });
    }

    //calculate working days
    const workingDays = calculationService.calculateWorkingDays(
      startDateColumnValue,
      endDateColumnValue,
      holidaysDates
    );

    //check start days is before end days
    if (workingDays < 0) {
      console.log("Start date is greater than end date");
      return res.status(400).send({
        severityCode: 4000,
        notificationErrorTitle: "Start Date After End Date",
        notificationErrorDescription: `Start Date is after End Date for the item id ${itemId}`,
        runtimeErrorDescription: `Automation failed to run because start date is after end date for item ${itemId} in board ${currentBoardId}`,
      });
    }

    //make mutations based on results in monday board
    const resultMutation = mondayService.changeResultColumnValue(
      shortLivedToken,
      currentBoardId,
      itemId,
      resultColumnId,
      String(workingDays)
    );

    //handle errors

    // console.log(holidaysDates);
    // console.log(startDateColumnValue);
    // console.log(endDateColumnValue);
    // console.log(workingDays);

    return res.status(200).send({});
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      severityCode: 6000,
      notificationErrorTitle: "Internal Server Error",
      notificationErrorDescription: "Something went wrong",
      runtimeErrorDescription:
        "Automation failed to run due to an internal server error",
    });
  }
}

module.exports = {
  executeAction,
};
