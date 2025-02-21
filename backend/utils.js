const { API_FETCH_DATA, API_GET_LOGS } = require('./Constants.js');
const { LogObject } = require('./LogObject.js');

const parseMessage = (message) => {
   try {
      const data = JSON.parse(message);
      const command = data.command;
      const dataValue = data.data;
      let parsedData;
      if (command === API_FETCH_DATA) {
         parsedData = parseFetchedData(dataValue);
      } else if (command === API_GET_LOGS) {
         parsedData = parseFetchedLogs(dataValue);
      }
      return {
         command,
         data: parsedData
      }
   } catch (error) {
      return message;
   }
}

const parseFetchedData = (data) => {
   return data;
}

const parseFetchedLogs = (data) => {
   const logs = [];
   for (const item of data) {
      const log = new LogObject(item);
      logs.push(log);
   }
   return logs;
}

module.exports = {
   parseMessage
}