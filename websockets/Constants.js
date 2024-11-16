
const PI1_URL = "http://192.168.50.155/admin/";
const PI2_URL = "http://192.168.50.215/admin/";
const API_FETCH_DATA = "fetchData";
const API_SEND_DISABLE = "disable";
const API_SEND_DISABLE_MINUTES = "disableMinutes";
const API_SEND_ENABLE = "enable";
const API_GET_LOGS = "getLogs";
const FETCH_INTERVAL = 1000; // ms
const DEFAULT_LOGS = 100;
const PI1_KEY = "9708b843d7a0824df4a68d8f73b61a94d63975987e8446257b8adcb1d04c8273";
const PI2_KEY ="9708b843d7a0824df4a68d8f73b61a94d63975987e8446257b8adcb1d04c8273";
const apiFetchDataToken = "api.php?summaryRaw&auth=";
const apiSendEnableToken = "api.php?enable&auth=";
const apiSendDisableToken = "api.php?disable&auth=";
const apiSendDisableMinutesTokenPart1 = "api.php?disable=";
const apiFetchLogsTokenPart1 = "api.php?getAllQueries=";
const apiAndAuth = "&auth=";
const WEBSOCKET_PORT = 8008;
const WEBSOCKET_CLIENT_PORT = 8009;

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
   WEBSOCKET_PORT,
   WEBSOCKET_CLIENT_PORT
};
