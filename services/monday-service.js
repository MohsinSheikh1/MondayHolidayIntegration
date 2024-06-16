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

const changeResultColumnValue = async (
  token,
  boardId,
  itemId,
  columnId,
  value
) => {
  try {
    const mondayClient = initMondayClient({ token });
    mondayClient.setApiVersion("2024-01");

    const query = `mutation change_simple_column_value($boardId: ID!, $itemId: ID!, $columnId: String!, $value: String!) {
      change_simple_column_value(board_id: $boardId, item_id: $itemId, column_id: $columnId, value: $value) {
        id
      }
    }`;

    const variables = { boardId, itemId, columnId, value };

    const response = await mondayClient.api(query, { variables });
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getBoardItems,
  getDateFromDateColumn,
  changeResultColumnValue,
};
