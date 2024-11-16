const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = require('./config');
let mysql = require('mysql');

const connection = mysql.createConnection({
   host: DB_HOST,
   port: DB_PORT,
   user: DB_USER,
   password: DB_PASSWORD,
   database: DB_NAME
});

connection.connect((err) => {
   if (err) {
      console.error('Error connecting to the database:', err);
   } else {
      console.log('Connected to the database');
   }
});

const closeConnection = () => {
   connection.end((err) => {
      if (err) {
         console.error('Error closing the database connection:', err);
      } else {
         console.log('Database connection closed');
      }
   });
}

const query = (sql, values) => {
   return new Promise((resolve, reject) => {
      connection.query(sql, values, (err, results) => {
         if (err) {
            reject(err);
         } else {
            resolve(results);
         }
      });
   });
}

module.exports = {
   closeConnection,
   query
};