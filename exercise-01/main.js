'use strict';


// 
// Exercise 1 ------------------------------------------------------------------------------------------------
//


let sql = 'CREATE TABLE author(id NUMBER, name STRING, city STRING, state STRING, country STRING)';


let sql = "create table author (id number, name string, age number, city string, state string, country string)";
let parsedStatement = sql.match(/create table ([a-z]+) (\(.*\))/);
let tableName = parsedStatement[1];
let columns = parsedStatement[2];
columns = columns.replace(/(\(|\))/g, "").split(",");
//console.log(tableName, columns); // print response exer 1
