//import monday service here
//import calculation service here

async function executeAction(req, res) {
  const { shortLivedToken } = req.session;
  const { payload } = req.body;

  try {
    const { inputFields } = payload;
    const { startDate, endDate, holidayBoardId, resultColumnId } = inputFields;
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "internal server error" });
  }
}
