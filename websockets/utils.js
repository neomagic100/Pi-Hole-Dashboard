const Constants = require('./Constants.js');
const { DEFAULT_LOGS, PI_1, URL1, URL2, API_FETCH_DATA, API_SEND_ENABLE, API_SEND_DISABLE,
   API_SEND_DISABLE_MINUTES, API_GET_LOGS, apiFetchDataToken, apiSendEnableToken, apiSendDisableToken,
   apiSendDisableMinutesTokenPart1, apiFetchLogsTokenPart1, apiAndAuth, key } = Constants;

/**
 * Constructs a URL based on the provided parameters.
 *
 * @param {number} lastIP - The last segment of the IP address to determine whether to use URL1 or URL2.
 * @param {string} action - The API action to perform, which determines the token used in the URL.
 * @param {string} [numLogs=`${DEFAULT_LOGS / 2}`] - The number of logs to fetch, defaults to half of DEFAULT_LOGS.
 * @param {number} [disableMinutes=0] - The number of minutes to disable, used only for the disable minutes action.
 * @returns {string} - The constructed URL string.
 */
const getUrl = (lastIP, action, numLogs = `${DEFAULT_LOGS / 2}`, disableMinutes = 0) => {
   const ip = (lastIP == PI_1) ? URL1 : URL2
   let token = "";
   if (action === API_FETCH_DATA) {
      token = apiFetchDataToken
   } else if (action === API_SEND_ENABLE) {
      token = apiSendEnableToken
   } else if (action === API_SEND_DISABLE) {
      token = apiSendDisableToken
   } else if (action === API_SEND_DISABLE_MINUTES) {
      token = `${apiSendDisableMinutesTokenPart1}${disableMinutes}${apiAndAuth}`
   } else if (action === API_GET_LOGS) {
      token = `${apiFetchLogsTokenPart1}${numLogs}${apiAndAuth}`
   }

   return `${ip}${token}${key}`
}

module.exports = {
   getUrl
}