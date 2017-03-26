// 
// Exercise 4 -----------------------------------------------------------------------------------------------
// 

'use strict'

let Database = function() {
	let tables = {};

	this.execute = function(cmd) {
		if (cmd.startsWith("create table")) return createTable(cmd);
		if (cmd.startsWith("insert")) return insert(cmd);
		if (cmd.startsWith("select")) return select(cmd);
	};

	function createTable(sql) {
		let parsedStatement = sql.match(/create table ([a-z]+) (\(.*\))/);
		let [undefined, tableName, columns] = parsedStatement;
		columns = columns.replace(/(\(|\))/g, "").split(",");
		tables[tableName] = {
			columns: {},
			data: []
		};
		for (let column of columns) {
			let [name, type] = column.trim().split(" ");
			tables[tableName].columns[name] = type;
		}
	};

	function insert(sql) {
		let parsedStatement = sql.match(/insert into ([a-z]+) (\(.*\)) values (\(.*\))/);
		let [undefined, tableName, columns, values] = parsedStatement;
		columns = columns.replace(/(\(|\))/g, "").split(",");
		values = values.replace(/(\(|\))/g, "").split(",");
		let row = {};
		for (let i = 0; i < columns.length; i++) {
			row[columns[i].trim()] = values[i].trim();
		}
		tables[tableName].data.push(row);
	};

	function select(sql) {
		let parsedStatement = sql.match(/select (.*) from (.*)/);
		let [undefined, columns, tableName] = parsedStatement;
		columns = columns.split(",");
		
		return columns;
	};
};

let database = new Database();
database.execute("create table author (id number, name string, age number, city string, state string, country string)");
database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
try {
	database.execute("select id, name, age from author");
} catch (e) {
	console.log(e);
}


console.log(JSON.stringify(database, undefined, 2));