'use strict';


let sql = "create table author (id number, name string, age number, city string, state string, country string)";

let parsedStatement = sql.match(/create table ([a-z]+) (\(.*\))/);
let tableName = parsedStatement[1];
let columns = parsedStatement[2];
columns = columns.replace(/(\(|\))/g, "").split(",");
//console.log(tableName, columns);

let database = {
	tables: {}
}
database.tables[tableName] = {
	columns: {},
	data: []
};
Object.defineProperty(database, 'tables', {
	writable: false,
	configurable: false,
	enumerable: true
});

for (let col of columns) {
	let parts = col.trim().split(" ");
	Object.assign(database.tables[tableName].columns, {[parts[0]]: parts[1]});
	
}
console.log(JSON.stringify(database));