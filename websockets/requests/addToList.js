const axios = require('axios');
const { PI_1, PI_2, BLACKLIST, WHITELIST, API_ADD_TO_LIST } = require('../Constants.js');
const { getUrl } = require('../utils.js');

async function sendAddToList(data) {

   const { domain, listType } = data;
   if (listType != null && (listType == BLACKLIST || listType == WHITELIST)) {
      try {
         let url1 = getUrl(PI_1, API_ADD_TO_LIST,0,0, listType, domain);
         let url2 = getUrl(PI_2, API_ADD_TO_LIST,0,0, listType, domain);
     
         const response1 = await axios.get(url1);
         const response2 = await axios.get(url2);
         // Log the response
         if (!response1.data.success) {
            console.error("Failed:", response1.data.message || response1.data);
         }
         if (!response2.data.success) {
            console.error("Failed:", response2.data.message || response2.data);
         }
      } catch (error) {
         console.error("Error:", error.response ? error.response.data : error.message);
      }
   }
}

module.exports = { sendAddToList };
