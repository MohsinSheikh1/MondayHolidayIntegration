const initMondayClient = require("monday-sdk-js");

const getBoardItems = async (token, boardId) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);
    mondayClient.setApiVersion("2024-04");

    //when there are no items in board "items" array inside "items_page" will be empty
    const query = `query($boardId: [ID!]) {
      boards(ids: $boardId) {
        items_page(limit: 100) {
          cursor
          items {
            name
            column_values {
              type
              value
            }
          }
        }
      }
    }`;

    const variables = { boardId };

    const response = await mondayClient.api(query, { variables });
    return response.data.boards[0].items_page.items;
  } catch (err) {
    console.log(err);
  }
};

const getDateFromDateColumn = async (token, itemId, columnId) => {
  //if date column is empty - value property inside column_values is "undefined"
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);
    mondayClient.setApiVersion("2024-04");

    const query = `query($itemId: [ID!], $columnId: [String!]) {
      items (ids: $itemId) {
        column_values (ids: $columnId) {
          value
        }
      }
    }`;

    const variables = { columnId, itemId };
    const response = await mondayClient.api(query, { variables });
    return JSON.parse(response.data.items[0].column_values[0].value)?.date;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getBoardItems,
  getDateFromDateColumn,
};
