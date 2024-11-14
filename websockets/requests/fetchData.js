const axios = require('axios');
const { API_FETCH_DATA, API_GET_LOGS, PI_1, PI_2 } = require('../Constants.js');
const { getUrl } = require('../utils.js');

let latestData = {};
let latestLogs = {};

// Function to fetch data from each API
async function fetchData(WebSocket, clients) {
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

async function fetchLogs(WebSocket, clients) {
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

const createMessage = (msgType) => {
   let data = (msgType === API_FETCH_DATA) ? latestData : latestLogs;
   const msg = JSON.stringify({
      type: msgType,
      data: data
   });

   return msg;
}

module.exports = {
   fetchData,
   fetchLogs
}