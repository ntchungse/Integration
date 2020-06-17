
var sql = require("mssql");
var connect = function()
{
    var conn = new sql.ConnectionPool({
        user:'HR',
        password:'123456',
        server:'PC',
        database:'HR'
    });
    return conn;
};

module.exports = connect;