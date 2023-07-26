const knex = require('knex');
const connectionObject = require("../utils/constant.js");

function connectDB(){
   const connect=knex(connectionObject);
   return connect;
}

module.exports=connectDB;