var mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"3104_hw2"
});


con.connect(function(err) {

/* database and tables creation
    if (err) throw err;
    con.query("CREATE DATABASE 3104_hw2", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
 var sql = "CREATE TABLE test (column1 int, column2 CHAR(255), column3 real, column4 VARCHAR(255))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
    */
});

function writerecord(query, recordnum){

    for (let i = 0; i < recordnum; i++) {
        con.query(query, function (err, result) {
            if (err) throw err;
        });

    }
}
function readrecord(query, recordnum){
    query = query + "LIMIT " + recordnum;
    con.query(query, function (err, result) {
        if (err) throw err;

    });

}



var record1columns = "INSERT INTO test (column1) VALUES (1)";
var record2columns = "INSERT INTO test (column1, column2) VALUES (1, 'a')";
var record3columns = "INSERT INTO test (column1, column2,column3) VALUES (1, 'a',2.35)";
var record4columns = "INSERT INTO test (column1, column2,column3,column4) VALUES (1, 'a',2.35,'12as34')";
var read1 = "SELECT column1 FROM test "
var read2 = "SELECT column1,column2 FROM test "
var read3 ="SELECT column1,column2,column3 FROM test "
var read4 = "SELECT * FROM test "
console.time("dbrecord")
readrecord(read3,100000)
console.timeEnd("dbrecord")




