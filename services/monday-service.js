const initMondayClient = require("monday-sdk-js");

const getColumnValue = async (token, itemId, columnId) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);
    mondayClient.setApiVersion("2024-04");

    const query = `query($itemId: [ID!], $columnId: [String!]) {
            items (ids: $itemId) {
                column_values(ids: $columnId) {
                    value
                }
            }
        }`;
    const variables = { columnId, itemId };

    const response = await mondayClient.api(query, { variables });
    return response.data.items[0].column_values[0].value;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getColumnValue,
};
