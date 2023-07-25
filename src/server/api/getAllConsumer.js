const connectDB = require("../models/database.js");

async function getAllConsumers() {
  let res = {};
  const dbConnection = await connectDB();
  try {
    res = await dbConnection("Consumers").select("*");
  } catch (err) {
    res = err;
  } finally {
    dbConnection.destroy();
  }
  return res;
}

module.exports = getAllConsumers;
