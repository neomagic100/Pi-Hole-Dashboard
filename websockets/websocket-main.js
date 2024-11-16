const WebSocket = require('ws');
const { API_SEND_DISABLE, API_SEND_ENABLE, API_SEND_DISABLE_MINUTES, WEBSOCKET_PORT, WEBSOCKET_CLIENT_PORT, FETCH_INTERVAL } = require('./Constants.js');
const { fetchData, fetchLogs } = require('./requests/fetchData.js');
const { sendEnablePis, sendDisablePis, sendDisablePisTimer } = require('./requests/enablePis.js');

const clientUrl = 'ws://backend:8009';
// Backend WebSocket client
const wsClient = new WebSocket(clientUrl);  // URL of your WebSocket server

wsClient.on('open', () => {
  console.log('Connected to WebSocket server.');

  // Send a message to the server after the connection is established
  wsClient.send('Hello, Server!');
});

wsClient.on('message', (message) => {
  console.log(`Received from server: ${message}`);
});

wsClient.on('error', (error) => {
  console.error('Error in WebSocket client:', error);
});

wsClient.on('close', () => {
  console.log('WebSocket client connection closed.');
});

// Start the Middleware WebSocket server
const wss = new WebSocket.Server({ port: WEBSOCKET_PORT });
const clients = new Set();

// Connect new clients
wss.on('connection', (clientSocket) => {
  console.log('New client connected');
  clients.add(clientSocket);

  // Handle client messages
  clientSocket.on('message', (message) => {
    console.log('Received message from client.');
    
    try {
      const data = JSON.parse(message);

      if (data.command === API_SEND_ENABLE) {
        sendEnablePis();
      } else if (data.command === API_SEND_DISABLE) {
        sendDisablePis();
      } else if (data.command === API_SEND_DISABLE_MINUTES) {
        sendDisablePisTimer(data.data);
      } else {
        console.log("Unknown command:", data.command)
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

// Schedule the fetchData function to run at intervals (e.g., every 10 seconds)
setInterval(() => fetchData(WebSocket, wsClient, clients), FETCH_INTERVAL);
setInterval(() => fetchLogs(WebSocket, wsClient, clients), FETCH_INTERVAL);

console.log(`WebSocket server running on ws://192.168.50.249:${WEBSOCKET_PORT}`);
console.log(`WebSocket client sending to ws://192.168.50.249:${WEBSOCKET_CLIENT_PORT}`);
