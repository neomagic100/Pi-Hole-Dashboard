// influxConnection.test.js
const influxConnection = require('../influxConnection.js');

describe('influxConnection', () => {
   beforeEach(() => {
      // Mock the process.env variables
      process.env.INFLUXDB_URL = 'http://localhost:8086';
      process.env.INFLUXDB_TOKEN = 'Rf1e_2jy3aEvUj458-8uzwoevcXnqkQyD_e3eV5Tk-SFsDV-AZ3c1tCEp22Z70e1X8vwK7NZHNdgvfxZO4gDdA==';
      process.env.ORG = 'org';
      process.env.BUCKET = 'pilogs';
   });

   afterEach(() => {
      // Restore the original process.env variables
      delete process.env.INFLUXDB_URL;
      delete process.env.INFLUXDB_TOKEN;
      delete process.env.ORG;
      delete process.env.BUCKET;
   });

   describe('connectDB', () => {
      const influxDB = jest.fn();
      const getWriteApi = jest.fn();
      it('should create a new InfluxDB instance', () => {
         influxConnection.InfluxDB = jest.fn(() => ({ getWriteApi }));
         influxConnection.connectDB();
         expect(influxDB).toHaveBeenCalledTimes(1);
         expect(getWriteApi).toHaveBeenCalledTimes(1);
      });

      it('should set the writeApi property', () => {
         influxConnection.connectDB();
         expect(influxConnection.writeApi).toBeDefined();
      });
   });

   describe('disconnectDB', () => {
      it('should close the writeApi', () => {
         const close = jest.fn();
         influxConnection.writeApi = { close };
         influxConnection.disconnectDB();
         expect(close).toHaveBeenCalledTimes(1);
      });
   });

   describe('writeLog', () => {
      it('should write a log point to the InfluxDB', () => {
         const writePoint = jest.fn();
         influxConnection.writeApi = { writePoint };
         const logObj = { toPoint: () => ({}) };
         influxConnection.writeLog(logObj);
         expect(writePoint).toHaveBeenCalledTimes(1);
      });
   });

   describe('writeMultiLogs', () => {
      it('should connect to the database, write multiple logs, and disconnect', () => {
         const connectDB = jest.fn();
         const writeLog = jest.fn();
         const disconnectDB = jest.fn();
         influxConnection.connectDB = connectDB;
         influxConnection.writeLog = writeLog;
         influxConnection.disconnectDB = disconnectDB;
         const logArray = [{}, {}];
         influxConnection.writeMultiLogs(logArray);
         expect(connectDB).toHaveBeenCalledTimes(1);
         expect(writeLog).toHaveBeenCalledTimes(2);
         expect(disconnectDB).toHaveBeenCalledTimes(1);
      });
   });

   describe('exit event handler', () => {
      it('should close the writeApi when the process exits', () => {
         const close = jest.fn();
         const writeApi = influxDB.getWriteApi(org, bucket, 'ns');
         process.on('exit', () => {
            writeApi.close().catch((err) => {
               console.error('Error closing the write API:', err);
            });
         });
         process.emit('exit');
         expect(close).toHaveBeenCalledTimes(1);
      });
   });
});