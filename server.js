var express = require('express');
var app = express();
require("msnodesqlv8");
var cors = require('cors')

app.use(cors());

app.get('/', function (req, res) {
  const sql = require('msnodesqlv8')
  const connectionString = "server=localhost\\ELIAV;Database=yarivDB;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

  sql.open(connectionString, function (err, conn) {
    var pm = conn.procedureMgr();
    pm.callproc('dbo.sp_getUsers', [], function(err, results, output) {
      res.send(results);
    });
  });
});

var server = app.listen(5000, function () {
  console.log('Server is running..');
});
