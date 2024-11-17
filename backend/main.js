const WebSocket = require('ws');
const http = require('http');
const { parseMessage } = require('./utils.js')
const { WEBSOCKET_SERVER_PORT, API_GET_LOGS } = require('./Constants.js');
const { writeMultiLogs } = require('./influxConnection.js');

// Start the WebSocket server
const server = http.createServer();
const wss = new WebSocket.Server({ server });
const clients = new Set();

// Connect new clients
wss.on('connection', (clientSocket) => {
   console.log('New client connected');
   clients.add(clientSocket);

   // Handle client messages
   clientSocket.on('message', (message) => {
      // console.log('Received message from client.');

      try {
         const parsedMessage = parseMessage(message);
         
         if (parsedMessage.command === API_GET_LOGS) {
            writeMultiLogs(parsedMessage.data);
         }
         
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

server.listen(WEBSOCKET_SERVER_PORT, '0.0.0.0', () => {
   console.log(`WebSocket server running on ws://backend:${WEBSOCKET_SERVER_PORT}`);
});