
const PI1_URL = process.env.PI1_URL;
const PI2_URL = process.env.PI2_URL;
const API_FETCH_DATA = "fetchData";
const API_SEND_DISABLE = "disable";
const API_SEND_DISABLE_MINUTES = "disableMinutes";
const API_SEND_ENABLE = "enable";
const API_GET_LOGS = "getLogs";
const FETCH_INTERVAL = process.env.FETCH_INTERVAL || 1000; // ms
const DEFAULT_LOGS = 100;
const PI1_KEY = process.env.PI1_API_KEY;
const PI2_KEY = process.env.PI2_API_KEY;
const apiFetchDataToken = "api.php?summaryRaw&auth=";
const apiSendEnableToken = "api.php?enable&auth=";
const apiSendDisableToken = "api.php?disable&auth=";
const apiSendDisableMinutesTokenPart1 = "api.php?disable=";
const apiFetchLogsTokenPart1 = "api.php?getAllQueries=";
const apiAndAuth = "&auth=";
const WEBSOCKET_PORT = 8008;

const ipMatch_pi1 = PI1_URL.match(/http:\/\/(\d+\.\d+\.\d+)\.(\d+)/);
const ipMatch_pi2 = PI2_URL.match(/http:\/\/(\d+\.\d+\.\d+)\.(\d+)/);
const PI_1 = ipMatch_pi1 ? parseInt(ipMatch_pi1[2], 10) : null;
const PI_2 = ipMatch_pi2 ? parseInt(ipMatch_pi2[2], 10) : null;

module.exports = {
   PI1_URL,
   PI2_URL,
   API_FETCH_DATA,
   API_SEND_DISABLE,
   API_SEND_DISABLE_MINUTES,
   API_SEND_ENABLE,
   API_GET_LOGS,
   PI_1,
   PI_2,
   FETCH_INTERVAL,
   DEFAULT_LOGS,
   PI1_KEY,
   PI2_KEY,
   apiFetchDataToken,
   apiSendEnableToken,
   apiSendDisableToken,
   apiSendDisableMinutesTokenPart1,
   apiFetchLogsTokenPart1,
   apiAndAuth,
   WEBSOCKET_PORT
};
