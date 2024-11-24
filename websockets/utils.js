const Constants = require('./Constants.js');
const { DEFAULT_LOGS, PI_1, PI1_URL, PI2_URL, API_FETCH_DATA, API_SEND_ENABLE, API_SEND_DISABLE, API_ADD_TO_LIST, PI1_KEY, PI2_KEY,
   API_SEND_DISABLE_MINUTES, API_GET_LOGS, apiFetchDataToken, apiSendEnableToken, apiSendDisableToken, apiAddToListTokenPart1, apiAddToListTokenPart2,
   apiSendDisableMinutesTokenPart1, apiFetchLogsTokenPart1, apiAndAuth } = Constants;

/**
 * Constructs a URL based on the provided parameters.
 *
 * @param {number} lastIP - The last segment of the IP address to determine whether to use PI1_URL or PI2_URL.
 * @param {string} action - The API action to perform, which determines the token used in the URL.
 * @param {number} [numLogs=DEFAULT_LOGS / 2] - The number of logs to fetch, defaults to half of DEFAULT_LOGS.
 * @param {number} [disableMinutes=0] - The number of minutes to disable, used only for the disable minutes action.
 * @param {string} [listType=null] - The type of list to add to, used only for the add to list action.
 * @param {string} [domain=null] - The domain to add, used only for the add to list action.
 * @returns {string} - The constructed URL string.
 */
const getUrl = (lastIP, action, numLogs = `${DEFAULT_LOGS / 2}`, disableMinutes = 0, listType = null, domain = null) => {
   const ip = (lastIP == PI_1) ? PI1_URL : PI2_URL;
   const key = (lastIP == PI_1) ? PI1_KEY : PI2_KEY;
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
   } else if (action === API_ADD_TO_LIST) {
      token = `${apiAddToListTokenPart1}${listType}${apiAddToListTokenPart2}${domain}${apiAndAuth}`
   }

   return `${ip}${token}${key}`
}

module.exports = {
   getUrl
}