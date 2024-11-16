const { API_FETCH_DATA, API_GET_LOGS } = require('./Constants.js');

const parseMessage = (message) => {
   try {
      const data = JSON.parse(message);
      const type = data.command;
      const dataValue = data.data;

      if (type === API_FETCH_DATA) {
         const data = parseFetchedData(dataValue);
      } else if (type === API_GET_LOGS) {
         const logs = parseFetchedLogs(dataValue);
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
      const log = new Log(item);
      logs.push(log);
   }
   return logs;
}

module.exports = {
   parseMessage
}