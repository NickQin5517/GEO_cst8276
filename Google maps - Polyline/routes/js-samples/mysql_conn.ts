function conn(){
  var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'DBcst8276', //
  password: '8276', //
  database: 'cst8276',
})

let sql = 'select polyline_route from cst8276.polyline order by id desc limit 1'

connection.connect((err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('Database connected')
})

let json_str =
  connection.query(sql, (err:any, result:any) => {
         if (err) {
             console.log(err);
         } else {
             console.log(result);
         }
     });

 console.log(json_str)
 return json_str
}

console.log(conn())


