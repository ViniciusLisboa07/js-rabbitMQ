const mysql = require('mysql2');
const dbConfig = require('../configs/database');

let con;
module.exports = {
    connect() {
        con = mysql.createConnection(dbConfig);
        con.connect((error) => {
            if (error) {
                console.log(`Não foi possível estabelecer a conexão com '${dbConfig.host}:${dbConfig.port}/${dbConfig.database}'`);
            } else {
                console.log(`Conexão com '${dbConfig.host}:${dbConfig.port}/${dbConfig.database}' estabelecida`);
            }
        });
    },

    getConnection() {
        return con;
    }
}