const mysql = require('mysql');
// var requirejs = require('requirejs');
// requirejs.config({
//   //Pass the top-level main.js/index.js require
//   //function to requirejs so that node modules
//   //are loaded relative to the top-level JS file.
//   nodeRequire: require
// });

// requirejs(['mysql'],
// function   (mysql) {
//   //foo and bar are loaded according to requirejs
//   //config, but if not found, then node's require
//   //is used to load the module.
// });

// var mysql = requirejs('mysql')

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

// export let json_str = connection.query(sql, (err:any, result:any) => {
//          if (err) {
//              console.log(err);
//          } else {
//              console.log(result);
//          }
//      });

let json_str =
  connection.query(sql, (err:any, result:any) => {
         if (err) {
             console.log(err);
         } else {
             console.log(result);
         }
     });

export default json_str


