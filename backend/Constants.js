const API_FETCH_DATA = "fetchData";
const API_GET_LOGS = "getLogs";
const WEBSOCKET_SERVER_PORT = 8009;

const API_LISTEN_PORT = 3000;
const PI1_URL = "http://192.168.1.155/admin/";
const PI2_URL = "http://192.168.1.215/admin/";
const API_DISABLE_PI = "disable";
const apiSendDisableMinutesTokenPart1 = "api.php?disable=";
const apiAndAuth = "&auth=";
const PI1_KEY = "9708b843d7a0824df4a68d8f73b61a94d63975987e8446257b8adcb1d04c8273";
const PI2_KEY = "9708b843d7a0824df4a68d8f73b61a94d63975987e8446257b8adcb1d04c8273";

const DB_HOST = "db";
const DB_PORT = 3306;
const DB_USER = "user";
const DB_PASSWORD = "password";
const DB_NAME = "pihole";

module.exports = {
   API_FETCH_DATA,
   API_GET_LOGS,
   WEBSOCKET_SERVER_PORT,
   DB_HOST,
   DB_PORT,
   DB_USER,
   DB_PASSWORD,
   DB_NAME,
   API_LISTEN_PORT,
   API_DISABLE_PI,
   apiSendDisableMinutesTokenPart1,
   apiAndAuth,
   PI1_KEY,
   PI2_KEY,
   PI1_URL,
   PI2_URL
}