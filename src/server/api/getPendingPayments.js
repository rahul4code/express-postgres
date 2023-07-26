const connectDB = require("../models/database.js");

async function getPendingPayments() {
  let res = {};
  const dbConnection = await connectDB();
  try {
    res = await dbConnection("Events").select("*").where({"state": "PENDING"});
  } catch (err) {
    return err;
  } finally {
    dbConnection.destroy();
  }
  return res
}

module.exports = getPendingPayments;
