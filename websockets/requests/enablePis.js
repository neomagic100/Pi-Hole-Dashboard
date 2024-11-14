const axios = require('axios');
const { API_SEND_ENABLE, API_SEND_DISABLE, PI_1, PI_2 } = require('../Constants.js');
const { getUrl } = require('../utils');

async function sendEnablePis() {
   try {
      await Promise.all([
         axios.get(getUrl(PI_1, API_SEND_ENABLE)),
         axios.get(getUrl(PI_2, API_SEND_ENABLE))
      ]);
   } catch (error) {
      console.error('Error sending data:', error);
   }
}

async function sendDisablePis() {
   try {
      await Promise.all([
         axios.get(getUrl(PI_1, API_SEND_DISABLE)),
         axios.get(getUrl(PI_2, API_SEND_DISABLE))
      ]);
   } catch (error) {
      console.error('Error sending data:', error);
   }
}

module.exports = { sendEnablePis, sendDisablePis };