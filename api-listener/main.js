const express = require("express");

const { WEBSOCKET_SERVER_PORT, API_GET_LOGS, API_LISTEN_PORT, API_DISABLE_PI, apiSendDisableMinutesTokenPart1, apiAndAuth, PI1_KEY, PI2_KEY, PI1_URL, PI2_URL } = require('./Constants.js');

const app = express();
app.use(express.json());

const PORT = process.env.PI_HOLE_API_PORT || API_LISTEN_PORT;

const disablePiHole = async (url, apiSendDisableMinutesTokenPart1, minutes, apiAndAuth, key) => {
   const seconds = minutes * 60;
   const response = await fetch(url + apiSendDisableMinutesTokenPart1 + seconds + apiAndAuth + key);
   if (!response.ok) {
      throw new Error('Network response was not ok ' + response.status);
   }
};

const disablePis = async (minutes = 10) => {
   try {
      disablePiHole(PI1_URL, apiSendDisableMinutesTokenPart1, minutes, apiAndAuth, PI1_KEY);
      disablePiHole(PI2_URL, apiSendDisableMinutesTokenPart1, minutes, apiAndAuth, PI2_KEY);
   } catch (error) {
      console.error('Error sending data:', error);
   }
};

app.get(`/${API_DISABLE_PI}`, async (req, res) => {
   const disabled = req.query.disable || true;
   if (disabled) {
      await disablePis();
   }
   res.sendStatus(200);
});

app.listen(PORT, () => {
   console.log(`REST API listening on port ${PORT}`);
});
