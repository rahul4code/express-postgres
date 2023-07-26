const connectDB = require("./../models/database.js");

const createOrders = async (payload) => {
  const dbConnection = await connectDB();
  try {
    await dbConnection("Orders").insert(payload);
    return { status: 200, message: "Connection Disconnected" };
  } catch (err) {
    throw err;
  } finally {
    dbConnection.destroy();
  }
};

module.exports = createOrders;
