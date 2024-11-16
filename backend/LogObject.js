class Log {
   /**
    * Constructs a new Log object from a given log array.
    *
    * @param {Array} logArray - An array containing log data.
    *   - logArray[0]: {number} Timestamp in seconds since the Unix epoch.
    *   - logArray[1]: {string} Query type, such as 'A' or 'AAAA'.
    *   - logArray[2]: {string} The domain queried.
    *   - logArray[3]: {string} The origin client making the query.
    *   - logArray[4]: {number} Status code: 0 (Allowed by default), 1 (Gravity Blocked), 
    *                           2 (Allowed by whitelist), 14 (Blocked by custom rule).
    *   - logArray[5]: {number} Reply code from DNS, where 0 indicates no error.
    *   - logArray[6]: {number} Action taken: 2 (Forwarded), 3 (Cached), 0 (Blocked).
    *   - logArray[7]: {number} Reply time in milliseconds.
    *   - logArray[8]: {string} DNSSEC status, typically 'N/A' if not used.
    *   - logArray[9]: {number} Response code, where -1 means no further action is needed.
    *   - logArray[10]: {string} Upstream server used, including DNS and port number.
    *   - logArray[11]: {any} Placeholder for additional data.
    *   - logArray[12]: {string} The entity that handled the log.
    */
   constructor(logArray) {
      const rawTime = logArray[0]; // Timestamp
      const dateTime = new Date(rawTime * 1000);
      
      this.time = dateTime.toLocaleString();
      // this.time = this.time.toLocaleDate;
      this.queryType = logArray[1]; // A or AAAA
      this.domainQueried = logArray[2];
      this.originClient = logArray[3];
      const tempStatus = logArray[4]; // 0 Allowed by default, 1 Gravity Blocked, 2 allowed by whitelist, 14 Blocked by custom rule
      this.status = tempStatus == '1' ? 'Gravity Blocked' : tempStatus == '2' ? 'Allowed by whitelist' : tempStatus == '14' ? 'Blocked by custom rule' : 'Allowed by default';
      this.replyCode = logArray[5]; // 0 no error (From DNS)
      const action = logArray[6]; // 2 - forwarded, 3 - cached, 0 - blocked
      this.actionTaken = action == '2' ? 'Forwarded' : action == '3' ? 'Cached' : 'Blocked';
      this.replyTime = logArray[7]; // milliseconds
      this.dnssecStatus = logArray[8]; // N/A - DNSSEC not used
      this.responseCode = logArray[9]; // -1 no further action needed
      this.upstreamServer = logArray[10]; // DNS used on port #
      this.placeholder = logArray[11];
      this.handledBy = logArray[12];
   }

   /**
    * Returns a copy of the data in a more readable format.
    * @returns {Object} A copy of the data in a more readable format.
    */
   present() {
      return {
         time: this.time,
         queryType: this.queryType,
         domainQueried: this.domainQueried,
         originClient: this.originClient,
         status: this.status,
         replyCode: this.replyCode,
         actionTaken: this.actionTaken,
         replyTime: this.replyTime,
         dnssecStatus: this.dnssecStatus,
         responseCode: this.responseCode,
         upstreamServer: this.upstreamServer,
         placeholder: this.placeholder
      };
   }

/**
 * Converts the log data into a JSON string representation.
 * @returns {string} JSON stringified representation of the log data.
 */
   toString() {
      return JSON.stringify(this.present());
   }
}

export default Log;
