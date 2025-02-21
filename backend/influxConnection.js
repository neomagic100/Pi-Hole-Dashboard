const { InfluxDB } = require('@influxdata/influxdb-client');

const url    = process.env.INFLUXDB_URL;
const token  = process.env.INFLUXDB_TOKEN;
const org    = process.env.ORG;
const bucket = process.env.BUCKET;

let writeApi;

function connectDB() {
   console.log("creating db")
   const influxDB = new InfluxDB({ url, token });
   writeApi = influxDB.getWriteApi(org, bucket, 'ns');
   writeApi.useDefaultTags({ region: 'us-east' });
}

function disconnectDB() {
   console.log("disconnecting db")
   writeApi.close().catch((err) => {
      console.error(err);
   });
   console.log("disconnected db")
}
function writeLog(logObj) {
   console.log("writing log")
   writeApi.writePoint(logObj.toPoint());
}

function writeMultiLogs(logArray) {
   connectDB();
   for (let i = 0; i < logArray.length; i++) {
      writeLog(logArray[i]);
   }
   disconnectDB();
}

process.on('exit', () => {
   writeApi.close().catch((err) => {
      console.error('Error closing the write API:', err);
   });
});

module.exports = { writeLog, writeMultiLogs };


