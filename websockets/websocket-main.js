const WebSocket = require('ws');
const axios = require('axios');

const URL1 = "http://192.168.50.155/admin/";
const URL2 = "http://192.168.50.215/admin/";
const API_FETCH_DATA = "fetchData";
const API_SEND_DISABLE = "disable";
const API_SEND_ENABLE = "enable";
const API_GET_LOGS = "getLogs";
const PI_1 = 155;
const PI_2 = 215;
const FETCH_INTERVAL = 1000; // ms
const DEFAULT_LOGS = 100;

const key = "9708b843d7a0824df4a68d8f73b61a94d63975987e8446257b8adcb1d04c8273"
const apiFetchDataToken = "api.php?summaryRaw&auth="
const apiSendEnableToken = "api.php?enable&auth="
const apiSendDisableToken = "api.php?disable&auth="
const apiFetchLogsTokenPart1 = "api.php?getAllQueries="
const apiFetchLogsTokenPart2 = "&auth="
const WEBSOCKET_PORT = 8008;

const getUrl = (lastIP, action, numLogs = `${DEFAULT_LOGS / 2}`) => {
  const ip = (lastIP == PI_1) ? URL1 : URL2
  let token = "";
  if (action === API_FETCH_DATA) {
    token = apiFetchDataToken
  } else if (action === API_SEND_ENABLE) {
    token = apiSendEnableToken
  } else if (action === API_SEND_DISABLE) {
    token = apiSendDisableToken
  } else if (action === API_GET_LOGS) {
    token = `${apiFetchLogsTokenPart1}${numLogs}${apiFetchLogsTokenPart2}`
  }

  return `${ip}${token}${key}`
}

const createMessage = (msgType) => {
  let data = (msgType === API_FETCH_DATA) ? latestData : latestLogs;
  const msg = JSON.stringify({
    type: msgType,
    data: data
  });

  return msg;
}

const wss = new WebSocket.Server({ port: WEBSOCKET_PORT });
const clients = new Set();
let latestData = {};
let latestLogs = {};

// Connect new clients
wss.on('connection', (clientSocket) => {
  console.log('New client connected');
  clients.add(clientSocket);

  clientSocket.on('message', (message) => {
    console.log('Received message from client:', message)
    
    try {
      const data = JSON.parse(message);

      if (data.command === API_SEND_ENABLE) {
        sendEnablePis();
      } else if (data.command === API_SEND_DISABLE) {
        sendDisablePis();
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

// Function to fetch data from each API
async function fetchData() {
  try {
    // Fetch from multiple sources
    const [data1, data2] = await Promise.all([
      axios.get(getUrl(PI_1, API_FETCH_DATA)),
      axios.get(getUrl(PI_2, API_FETCH_DATA))
    ]);

    // Structure data as needed
    latestData = {
      pi1: data1.data,
      pi2: data2.data
    };

    // Broadcast data to all connected clients
    clients.forEach((clientSocket) => {
      if (clientSocket.readyState === WebSocket.OPEN) {
        const msg = createMessage(API_FETCH_DATA);
        clientSocket.send(msg);
      }
    });

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function fetchLogs() {
  try {
    // Fetch from multiple sources
    const [data1, data2] = await Promise.all([
      axios.get(getUrl(PI_1, API_GET_LOGS)),
      axios.get(getUrl(PI_2, API_GET_LOGS))
    ]);

    if (data1.data) {
      for (let item of data1.data.data) {
        item.push("Proxmox");
      }
      latestLogs = [...data1.data.data];
    }

    if (data2.data) {
      for (let item of data2.data.data) {
        item.push("RP");
      }
      latestLogs = [...latestLogs, ...data2.data.data]
    }

    // Broadcast data to all connected clients
    clients.forEach((clientSocket) => {
      if (clientSocket.readyState === WebSocket.OPEN) {
        const msg = createMessage(API_GET_LOGS);
        clientSocket.send(msg);
      }
    });

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function sendEnablePis() {
  try {
    await Promise.all([
      axios.get(getUrl(PI_1, API_SEND_ENABLE)),
      axios.get(getUrl(PI_2, API_SEND_ENABLE))
    ]);
  } catch (error) {
    console.error('Error sending data:', error);
  }
}

async function sendDisablePis() {
  try {
    await Promise.all([
      axios.get(getUrl(PI_1, API_SEND_DISABLE)),
      axios.get(getUrl(PI_2, API_SEND_DISABLE))
    ]);
  } catch (error) {
    console.error('Error sending data:', error);
  }
}

// Schedule the fetchData function to run at intervals (e.g., every 10 seconds)
setInterval(fetchData, FETCH_INTERVAL);
setInterval(fetchLogs, FETCH_INTERVAL);

console.log(`WebSocket server running on ws://192.168.50.249:${WEBSOCKET_PORT}`);
