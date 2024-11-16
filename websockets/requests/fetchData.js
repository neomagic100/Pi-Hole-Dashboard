const axios = require('axios');
const { API_FETCH_DATA, API_GET_LOGS, PI_1, PI_2 } = require('../Constants.js');
const { getUrl } = require('../utils.js');

let latestData = {};
let latestLogs = {};

/**
 * Fetches data from multiple sources and broadcasts it to connected WebSocket clients.
 *
 * This function concurrently requests data from two APIs, structures the fetched data,
 * and then sends it to all active WebSocket clients. It uses the `getUrl` utility
 * to build the API request URLs for two different endpoints identified by constants PI_1 and PI_2.
 *
 * @param {WebSocket} WebSocket - The WebSocket module used to check the connection status.
 * @param {Set} clients - A set of connected WebSocket clients to broadcast the fetched data.
 * @throws Will log an error if the fetching process fails.
 */
async function fetchData(WebSocket, WebSocketClient, clients) {
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
            WebSocketClient.send(msg);
         }
      });

   } catch (error) {
      console.error('Error fetching data:', error);
   }
}

/**
 * Fetches log data from multiple sources and broadcasts it to connected WebSocket clients.
 *
 * This function concurrently requests log data from two APIs, structures the fetched data,
 * and then sends it to all active WebSocket clients. It uses the `getUrl` utility
 * to build the API request URLs for two different endpoints identified by constants PI_1 and PI_2.
 *
 * @param {WebSocket} WebSocket - The WebSocket module used to check the connection status.
 * @param {Set} clients - A set of connected WebSocket clients to broadcast the fetched data.
 * @throws Will log an error if the fetching process fails.
 */
async function fetchLogs(WebSocket, WebSocketClient, clients) {
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
            WebSocketClient.send(msg);
         }
      });

   } catch (error) {
      console.error('Error fetching data:', error);
   }
}

/**
 * Creates a WebSocket message string to send to connected clients.
 *
 * @param {string} msgType - The type of message to create.
 * @returns {string} The created message string.
 */
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