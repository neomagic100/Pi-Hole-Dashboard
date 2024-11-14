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

module.exports = {
   URL1,
   URL2,
   API_FETCH_DATA,
   API_SEND_DISABLE,
   API_SEND_ENABLE,
   API_GET_LOGS,
   PI_1,
   PI_2,
   FETCH_INTERVAL,
   DEFAULT_LOGS,
   key,
   apiFetchDataToken,
   apiSendEnableToken,
   apiSendDisableToken,
   apiFetchLogsTokenPart1,
   apiFetchLogsTokenPart2,
   WEBSOCKET_PORT
};
