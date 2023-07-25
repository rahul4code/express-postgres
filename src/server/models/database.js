// const { Client } = require('pg');
const knex = require('knex');
const connectionObject = require("../constant.js");

function connectDB(){
   const connect=knex(connectionObject);
   return connect;
}

module.exports=connectDB;