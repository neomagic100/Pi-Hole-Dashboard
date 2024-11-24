const axios = require('axios');
const { PI_1, PI_2, BLACKLIST, WHITELIST, PI1_KEY, PI2_KEY } = require('../Constants.js');
const { getUrl } = require('../utils.js');

async function sendAddToList(data) {

   const { domain, listType } = data;
   console.log("Adding", domain, "to", listType)
   if (listType != null && (listType == BLACKLIST || listType == WHITELIST)) {
      try {
         let url1 = getUrl(PI_1, listType);
         let url2 = getUrl(PI_2, listType);
         console.log("urls created")
         let data1 = new URLSearchParams();
         let data2 = new URLSearchParams();
         data1.append("auth", PI1_KEY);
         data1.append("domain", domain);
         data2.append("auth", PI2_KEY);
         data2.append("domain", domain);
         console.log('data appended')
         const response1 = await axios.post(url1, data1);
         const response2 = await axios.post(url2, data2);
         console.log('responses received')
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