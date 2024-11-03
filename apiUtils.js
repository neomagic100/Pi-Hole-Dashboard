import { ref } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import config from "../config/config.json";
import Log from "../utils/LogObject";

// Fetch data function
export async function fetchData(stateRefs) {
   const {
      dns_queries_today,
      ads_blocked_today,
      ad_block_percentage,
      domains_blocked,
      gravity_last_updated,
      pi1Enabled,
      pi2Enabled,
   } = stateRefs;
   try {
      const response1 = await fetch(
         config.url + "api.php?summaryRaw&auth=" + config.key
      );
      const data1 = await response1.json();
      pi1Enabled.value = data1.status === "enabled";
      const response2 = await fetch(
         config.url2 + "api.php?summaryRaw&auth=" + config.key2
      );
      const data2 = await response2.json();
      pi2Enabled.value = data2.status === "enabled";

      dns_queries_today.pi1 = data1.dns_queries_today;
      dns_queries_today.pi2 = data2.dns_queries_today;
      ads_blocked_today.pi1 = data1.ads_blocked_today;
      ads_blocked_today.pi2 = data2.ads_blocked_today;
      ad_block_percentage.pi1 = data1.ads_percentage_today;
      ad_block_percentage.pi2 = data2.ads_percentage_today;
      domains_blocked.pi1 = data1.domains_being_blocked;
      domains_blocked.pi2 = data2.domains_being_blocked;
      gravity_last_updated.pi1 = data1.gravity_last_updated.relative;
      gravity_last_updated.pi2 = data2.gravity_last_updated.relative;

      await fetchLogs(stateRefs);
   } catch (error) {
      console.error(error);
   }
}

export async function fetchLogs(stateRefs, numberQueries = 10) {
   const queryUrl1 =
      config.url +
      "api.php?getAllQueries=" +
      numberQueries +
      "&auth=" +
      config.key;
   const queryUrl2 =
      config.url2 +
      "api.php?getAllQueries=" +
      numberQueries +
      "&auth=" +
      config.key2;
   try {
      const { logObjs } = stateRefs;
      const response = await fetch(queryUrl1);
      const data = await response.json();
      const response2 = await fetch(queryUrl2);
      const data2 = await response2.json();
      // let tempQueue = new LogQueue();
      for (let item of data.data) {
         item.push("Proxmox");
         let log = new Log(item);
         logObjs.value.enqueue(log);
      }

      for (let item of data2.data) {
         item.push("RP");
         let log = new Log(item);
         logObjs.value.enqueue(log);
      }
      logObjs.value.sortQueue();
   } catch (error) {
      console.log(error);
   }
}

// Enable and disable functions
export async function enablePi() {
   await togglePi("enable");
}
export async function disablePi() {
   await togglePi("disable");
}
async function togglePi(action) {
   const urls = [
      config.url + `api.php?${action}&auth=` + config.key,
      config.url2 + `api.php?${action}&auth=` + config.key2,
   ];
   try {
      await Promise.all(urls.map((url) => fetch(url, { method: "GET" })));
   } catch (error) {
      console.error(`Failed to ${action} ad blocker`, error);
   }
}

// // Timer
// export function startTimer(duration) {
//    const timer = setInterval(() => {
//       if (duration <= 0) clearInterval(timer);
//       else duration -= 1;
//    }, duration * 1000);
//    return timer;
// }

// Notification function
export function notify(statusChange) {
   const message =
      statusChange === "enabled"
         ? "Ad Blocking Enabled"
         : "Ad Blocking Disabled";
   toast(message, {
      position: toast.POSITION.BOTTOM_CENTER,
      type:
         statusChange === "enabled"
            ? "success"
            : statusChange === "disabled"
            ? "warning"
            : "error",
      pauseOnFocusLoss: false,
      closeOnClick: true,
      closeButton: false,
   });
}
