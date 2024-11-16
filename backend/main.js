const WebSocket = require('ws');
const { parseMessage } = require('./utils.js')
const { WEBSOCKET_SERVER_PORT } = require('./Constants.js');

// Start the WebSocket server
const wss = new WebSocket.Server({ port: WEBSOCKET_SERVER_PORT });
const clients = new Set();

// Connect new clients
wss.on('connection', (clientSocket) => {
   console.log('New client connected');
   clients.add(clientSocket);

   // Handle client messages
   clientSocket.on('message', (message) => {
      console.log('Received message from client.');

      try {
         const parsedMessage = parseMessage(message);
         console.log(parsedMessage);
      } catch (err) {
         console.error('Error processing client message:', err);
      }

   });

   // Handle client disconnect
   clientSocket.on('close', () => {
      clients.delete(clientSocket);
      console.log('Client disconnected');
   });
});

console.log(`WebSocket server running on ws://backend:${WEBSOCKET_SERVER_PORT}`);