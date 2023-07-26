const connectDB = require("../models/database.js");

async function removePendingEvents(payload) {
  let res = {};
  const dbConnection = await connectDB();
  try {
    res = await dbConnection("Events").where('state', 'PENDING').andWhere('order_no', payload?.order_no).del();
  } catch (err) {
    return err;
  } finally {
    dbConnection.destroy();
  }
  return res
}

module.exports = removePendingEvents;
