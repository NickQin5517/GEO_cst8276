var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'cst8276', //
  password: 'cst8276', //
  database: 'cst8276',
})
connection.connect((err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('Database connected')
})
module.exports = connection
