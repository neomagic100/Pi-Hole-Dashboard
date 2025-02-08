const express = require("express");
const WebSocket = require('ws');
const http = require('http');
const { parseMessage } = require('./utils.js')
const { WEBSOCKET_SERVER_PORT, API_GET_LOGS, API_LISTEN_PORT, API_DISABLE_PI, apiSendDisableMinutesTokenPart1, apiAndAuth, PI1_KEY, PI2_KEY, PI1_URL, PI2_URL } = require('./Constants.js');
const { writeMultiLogs } = require('./influxConnection.js');

// Start the WebSocket server
const server = http.createServer();
const wss = new WebSocket.Server({ server });
const clients = new Set();
const app = express();
app.use(express.json());

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

const PORT = process.env.PI_HOLE_API_PORT || API_LISTEN_PORT;

const disablePiHole = async (url, apiSendDisableMinutesTokenPart1, minutes, apiAndAuth, key) => {
   const response = await fetch(url + apiSendDisableMinutesTokenPart1 + disableMinutes.value + apiAndAuth + key);
   if (!response.ok) {
      throw new Error('Network response was not ok');
   }
};

const disablePis = async (minutes = 10) => {
   try {
      disablePiHole(PI1_URL, apiSendDisableMinutesTokenPart1, minutes, apiAndAuth, PI1_KEY);
      disablePiHole(PI2_URL, apiSendDisableMinutesTokenPart1, minutes, apiAndAuth, PI2_KEY);
   } catch (error) {
      console.error('Error sending data:', error);
   }
};

app.get(`/${API_DISABLE_PI}`, async (req, res) => {
   const disabled = req.query.disable || true;
   if (disabled) {
      await disablePis();
   }
   res.sendStatus(200);
});

app.listen(PORT, () => {
   console.log(`REST API listening on port ${PORT}`);
});
server.listen(WEBSOCKET_SERVER_PORT, '0.0.0.0', () => {
   console.log(`WebSocket server running on ws://backend:${WEBSOCKET_SERVER_PORT}`);
});

