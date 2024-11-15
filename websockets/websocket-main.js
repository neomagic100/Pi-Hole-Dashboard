const WebSocket = require('ws');
const { API_SEND_DISABLE, API_SEND_ENABLE, API_SEND_DISABLE_MINUTES, WEBSOCKET_PORT, FETCH_INTERVAL } = require('./Constants.js');
const { fetchData, fetchLogs } = require('./requests/fetchData.js');
const { sendEnablePis, sendDisablePis, sendDisablePisTimer } = require('./requests/enablePis.js');

// Start the WebSocket server
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
setInterval(() => fetchData(WebSocket, clients), FETCH_INTERVAL);
setInterval(() => fetchLogs(WebSocket, clients), FETCH_INTERVAL);

console.log(`WebSocket server running on ws://192.168.50.249:${WEBSOCKET_PORT}`);
