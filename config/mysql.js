const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

//연결
const mysqlConnection = {
    init:function(){
        return mysql.createConnection({
           host: process.env.MYSQL_HOST,
           database: process.env.MYSQL_DB,
           user: process.env.MYSQL_USER,
           password: process.env.MYSQL_PASS,
           port: process.env.MYSQL_PORT,
        });
    },
    open: function(conn) {
        conn.connect(function(err){
            if(err) {
                console.error('MYSQL connection failed');
                console.error('Error Code :' + err.code);
                console.error('Error Message : ' + err.message);
            }else{
                console.log("MYSQL 접속 성공!!!🍬🍬")
            }
        });
    }
};

module.exports = mysqlConnection;