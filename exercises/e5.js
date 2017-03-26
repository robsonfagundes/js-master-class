// 
// Exercise 5 -----------------------------------------------------------------------------------------------
// 

"use strict"

class Table {
	constructor() {
		this.columns = {};
		this.data = [];
	}
};

class Database {

	constructor(name = "New Database") {
		this.name = name;
		this.tables = {};
	}

	execute(sql) {
		let [cmd] = sql.match(/([a-z]+)/);
		if (![cmd]) return;
		return this[cmd](sql);
	}

	create(sql) {
		let parsedStatement = sql.match(/create table ([a-z]+) (\(.*\))/);
		let [undefined, tableName, columns] = parsedStatement;
		columns = columns.replace(/(\(|\))/g, "").split(",");
		this.tables[tableName] = new Table();
		for (let column of columns) {
			let [name, type] = column.trim().split(" ");
			this.tables[tableName].columns[name] = type;
		}
	};

	insert(sql) {
		let parsedStatement = sql.match(/insert into ([a-z]+) (\(.*\)) values (\(.*\))/);
		let [undefined, tableName, columns, values] = parsedStatement;
		columns = columns.replace(/(\(|\))/g, "").split(",");
		values = values.replace(/(\(|\))/g, "").split(",");
		let row = {};
		for (let i = 0; i < columns.length; i++) {
			row[columns[i].trim()] = values[i].trim();
		}
		this.tables[tableName].data.push(row);
	};

	select(sql) {
		let parsedStatement = sql.match(/select (.*) from (.*)/);
		let [undefined, columns, tableName] = parsedStatement;
		columns = columns.split(",");
		if (!(tableName in this.tables)) throw `A tabela ${tableName} não existe`;
		var results = [];
		for(let row of this.tables[tableName].data) {
			var result = {};
			for(let column of columns) {
				column = column.trim();
				if (!(column in this.tables[tableName].columns)) throw `A coluna ${column} não existe`;
				Object.assign(result, {[column]: row[column]});
			}
			results.push(result);
		}
		return results;
	};

}


let database = new Database();
database.execute("create table author (id number, name string, age number, city string, state string, country string)");
database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");
console.log(JSON.stringify(database.execute("select id, name, age from author"), undefined, 2));