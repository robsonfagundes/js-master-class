'use strict';

let sql = 'CREATE TABLE author(id NUMBER, name STRING, city STRING, state STRING, country STRING)';

let tableName = sql.match(/([a-zA-Z]+)/g)[1];
let columns = sql.match(/([a-z\s,]+)/g)[1];

console.log(tableName);
console.log(columns);