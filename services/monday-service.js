const initMondayClient = require("monday-sdk-js");

const getBoardItems = async (token, boardId) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);
    mondayClient.setApiVersion("2024-04");

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
    return response.data.boards.items_page.items;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getBoardItems,
};
