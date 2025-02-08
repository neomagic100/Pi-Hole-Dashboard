const { parentPort, workerData } = require('worker_threads');

let countDown = workerData.seconds;

parentPort.postMessage(countDown);

const interval = setInterval(() => {
   countDown--;
   parentPort.postMessage(countDown);

   if (countDown <= 0) {
      clearInterval(interval);
      parentPort.postMessage(0);
   }
}, 1000);

parentPort.on('message', (message) => {
   if (message === 'stop') {
      countDown = 0;
      clearInterval(interval);
   }
});