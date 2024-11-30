const axios = require('axios');
const { API_SEND_ENABLE, API_SEND_DISABLE, API_SEND_DISABLE_MINUTES, PI_1, PI_2 } = require('../Constants.js');
const { getUrl } = require('../utils');

/**
 * Sends a request to enable Pis.
 *
 * This function sends parallel GET requests to enable Pis by contacting
 * the APIs at predefined URLs for PI_1 and PI_2.
 *
 * @throws Will log an error if the request fails.
 */
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

/**
 * Sends a request to disable Pis.
 *
 * This function sends parallel GET requests to disable Pis by contacting
 * the APIs at predefined URLs for PI_1 and PI_2.
 *
 * @returns {Promise<void>} - A promise that resolves when both requests are complete.
 * @throws Will log an error if any request fails.
 */
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

/**
 * Sends a request to disable Pis for a specified number of minutes.
 *
 * @param {number} disableMinutes - The number of minutes to disable the Pis.
 * @returns {Promise<number>} - A promise that resolves to the number of minutes the Pis are disabled.
 * @throws Will log an error if the request fails.
 */
async function sendDisablePisTimer(disableMinutes) {
   const url1 = getUrl(PI_1, API_SEND_DISABLE_MINUTES, 0, disableMinutes * 60);
   const url2 = getUrl(PI_2, API_SEND_DISABLE_MINUTES, 0, disableMinutes * 60);
   try {
      await Promise.all([
         axios.get(url1),
         axios.get(url2)
      ]);
   } catch (error) {
      console.error('Error sending data:', error);
   }

   return disableMinutes;
}

module.exports = { sendEnablePis, sendDisablePis, sendDisablePisTimer };