// 
// Exercise  3------------------------------------------------------------------------------------------------
// 

'use strict' 
 
let database = {
	tables: {},
	execute(cmd) {
		if (cmd.startsWith("create table")) return this.createTable(cmd);
		if (cmd.startsWith("insert")) return this.insert(cmd);
	},
	createTable(sql) {
		let parsedStatement = sql.match(/create table ([a-z]+) (\(.*\))/);
		let [undefined, tableName, columns] = parsedStatement;
		columns = columns.replace(/(\(|\))/g, "").split(",");
		this.tables[tableName] = {
			columns: {},
			data: []
		};
		for (let col of columns) {
			let parts = col.trim().split(" ");
			Object.assign(database.tables[tableName].columns, {
				[parts[0]]: parts[1]
			});
		}
	},
	insert(sql) {
		let parsedStatement = sql.match(/insert into ([a-z]+) (\(.*\)) values (\(.*\))/);
		let [undefined, tableName, columns, values] = parsedStatement;
		columns = columns.replace(/(\(|\))/g, "").split(",");
		values = values.replace(/(\(|\))/g, "").split(",");
		let row = {};
		for(let i = 0; i < columns.length; i++) {
			row[columns[i].trim()] = values[i].trim();
		}
		this.tables[tableName].data.push(row);
	}
}

database.execute("create table author (id number, name string, age number, city string, state string, country string)");
database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
database.execute("insert into author (id, name, age) values (1, Linus Torvalds, 47)");

console.log(JSON.stringify(database, undefined, 2));