const WebSocket = require('ws');
const { API_SEND_DISABLE, API_SEND_ENABLE, API_SEND_DISABLE_MINUTES, API_ADD_TO_LIST, WEBSOCKET_PORT, WEBSOCKET_CLIENT_PORT, FETCH_INTERVAL, GET_TIMER } = require('./Constants.js');
const { fetchData, fetchLogs } = require('./requests/fetchData.js');
const { sendEnablePis, sendDisablePis, sendDisablePisTimer } = require('./requests/enablePis.js');
const { sendAddToList } = require('./requests/addToList.js');
const { Worker } = require('worker_threads');
const path = require('path');
let timeLeft = null;
let worker = null;

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
const wss = new WebSocket.Server({ address: '0.0.0.0', port: WEBSOCKET_PORT });
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
        stopTimer();
      } else if (data.command === API_SEND_DISABLE) {
        sendDisablePis();
      } else if (data.command === API_SEND_DISABLE_MINUTES) {
        sendDisablePisTimer(data.data);
        timeLeft = data.data * 60;
        runTimer(data.data);
      } else if (data.command === API_ADD_TO_LIST) {
        sendAddToList(data.data);
      } else if (data.command === GET_TIMER) {
        console.log(data.command, data.data)
        const minutesLeft = parseInt(timeLeft / 60);
        const secondsLeft = timeLeft % 60;
        console.log({ type: GET_TIMER, data: { minutes: minutesLeft, seconds: secondsLeft } });
        clientSocket.send(JSON.stringify({ type: GET_TIMER, data: { minutes: minutesLeft, seconds: secondsLeft } }));
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

const getTimeLeft = () => {
  if (timeLeft === null) {
    return 0;
  }
  else {
    return timeLeft;
  }
}

// Run the worker and get the countdown updates
const runTimer = (minutes) => {
  timeLeft = minutes * 60;
  return new Promise((resolve, reject) => {
    seconds = minutes * 60
    worker = new Worker(path.join(__dirname, 'worker.js'), {
      workerData: { seconds }
    });

    worker.on('message', (message) => {
      if (message === 0) {
        stopTimer();
        resolve();
      }
      else {
        timeLeft = message;
      }
    });

    worker.on('error', (error) => {
      reject(error);
    });

    worker.on('exit', (code) => {
      if (code !== 0) {
        stopTimer();
      }
    });
  });
}

const stopTimer = () => {
  if (worker) {
    worker.postMessage('stop');
    worker.terminate();
    timeLeft = null;
  }
  else {
    timeLeft = null;
  }
}

// Schedule the fetchData function to run at intervals (e.g., every 10 seconds)
setInterval(() => fetchData(WebSocket, wsClient, clients, timeLeft), FETCH_INTERVAL);
setInterval(() => fetchLogs(WebSocket, wsClient, clients), FETCH_INTERVAL);

console.log(`WebSocket server running on ws://192.168.1.220:${WEBSOCKET_PORT}`);
console.log(`WebSocket client sending to ws://192.168.1.220:${WEBSOCKET_CLIENT_PORT}`);
