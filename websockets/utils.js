const Constants = require('./Constants.js');
const { DEFAULT_LOGS, PI_1, URL1, URL2, API_FETCH_DATA, API_SEND_ENABLE, API_SEND_DISABLE, API_GET_LOGS, apiFetchDataToken, apiSendEnableToken, apiSendDisableToken, apiFetchLogsTokenPart1, apiFetchLogsTokenPart2, key } = Constants;

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

module.exports = {
   getUrl
}