const WebSocket = require('ws');
const Board = require('../models/board');

let wss;

const setupWebSocket = (server) => {
  wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
    console.log('Client connected');

    // Parse board ID from URL
    const url = new URL(req.url, 'http://localhost');
    const boardId = url.searchParams.get('boardId');

    if (boardId) {
      // Subscribe to this board
      ws.boardId = boardId;
    }

    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message);

        // Handle updating the board in database based on message type
        if (data.type === 'ADD_CARD') {
          const board = await Board.findById(data.boardId);
          const column = board.columns.find((col) => col.id === data.columnId);

          if (column) {
            column.cards.push({
              text: data.text,
              author: data.author || 'Anonymous',
            });

            await board.save();
          }
        } else if (data.type === 'UPDATE_CARD') {
          // Handle updating a card
        } else if (data.type === 'DELETE_CARD') {
          // Handle deleting a card
        }

        // Broadcast the message to all clients subscribed to this board
        broadcastToBoard(data.boardId, message);
      } catch (err) {
        console.error('Error processing WebSocket message:', err);
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });
};

const broadcastToBoard = (boardId, message) => {
  wss.clients.forEach((client) => {
    if (client.boardId === boardId && client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

module.exports = {
  setupWebSocket,
};
