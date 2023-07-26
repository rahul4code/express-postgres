const connectDB = require("../models/database.js");

async function requestConnection(payload) {
  let res = {};
  const dbConnection = await connectDB();
  try {
    res = await dbConnection("Events").insert(payload);
  } catch (err) {
    res = err;
  } finally {
    dbConnection.destroy();
  }
  return res;
}

module.exports = requestConnection;
