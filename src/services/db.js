const mysql = require('mysql2');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const serverCa = [fs.readFileSync(__dirname + "/rds-ca-2019-root.pem", "utf8")];

class DBConnection {

    constructor() {

        this.params  = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE,
            port:'3306'
        }


        if(process.env.DB_HOST !== 'localhost')
        {
            this.params['ssl'] = {
                rejectUnauthorized: true,
                ca: serverCa
            }
        }
       
       
        this.db = mysql.createPool(this.params);
        this.checkConnection();
    }

    checkConnection() {
        this.db.getConnection((err, connection) => {
            if (err) {
                console.log(err);
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.');
                }
            }
            if (connection) {
                connection.release();
            }
            return
        });
    }

    query = async(sql, values) => {
        return new Promise((resolve, reject) => {
            const callback = (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(result);
                }
                // execute will internally call prepare and query
            this.db.execute(sql, values, callback);
        }).catch(err => {
            const mysqlErrorList = Object.keys(HttpStatusCodes);
            // convert mysql errors which in the mysqlErrorList list to http status code
            err.status = mysqlErrorList.includes(err.code) ? HttpStatusCodes[err.code] : err.status;

            throw err;
        });
    }
}

const HttpStatusCodes = Object.freeze({
    ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 422,
    ER_DUP_ENTRY: 409
});

module.exports = new DBConnection().query;