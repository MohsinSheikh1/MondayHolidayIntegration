const getDateColumnValues = function (items) {
  /*
  gets all date column values corresponding to each item in holiday board in an array
  filters out those date column values which do not have a date set
  empty array if there are no items in date column values or all of the dates are not set
  REQUIREMENT - ONLY ONE DATE COLUMN IN ITEMS OTHERWISE LAST DATE COLUMN TO BE PARSED WILL BE RETURNED
  */

  return items
    .map((item) => item?.column_values)
    .map((column_values) =>
      column_values.reduce((prev, curr) => {
        return curr?.type === "date" ? curr?.value : prev?.value;
      }, {})
    )
    .map((date) => JSON.parse(date)?.date)
    .filter((date) => date);
};

module.exports = {
  getDateColumnValues,
};
