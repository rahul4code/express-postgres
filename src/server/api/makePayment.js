const connectDB = require("../models/database.js");
const generateId = require("../utils/generateId.js");
const generateOrders = require("../utils/generateOrder.js");

async function makePayment(paymentObj) {
  const {
    willPay,
  } = paymentObj;

  let result = {};
  if (willPay) {
    await addEvent(paymentObj)
      .then((res) => {
        result = res;
      })
      .catch((err) =>{
        throw err
      });
  } else {
    await addEventWithOrder(paymentObj)
      .then((res) => {
        result = res;
      })
      .catch((err) => {
        throw err;
      });
  }
  return result;
}

const checkIsOrderIssued=async (consumer_no)=>{
  let result = null;
  const dbConnection = await connectDB();
  try {
    result = await dbConnection("Orders")
      .select("order_status")
      .where("consumer_no", consumer_no)
      .andWhere("order_status", "ISSUED");
      
      return result;
  } catch (err) {
    throw err;
  } finally {
    dbConnection.destroy();
  }
}

const addEvent = async (paymentObj) => {
  const now = new Date();
  const {
    perfomed_by,
    consumer_no,
    name,
    order_no = generateOrders(),
    reason,
    reason_code,
    bill_year_month,
    amount,
    remarks,
  } = paymentObj;
  const dbConnection = await connectDB();
  try {
    await dbConnection("Events").insert({
      id: generateId(),
      perfomed_by,
      consumer_no,
      name,
      state: "PAID",
      remarks,
      reason,
      reason_code,
      order_no,
      amount,
      bill_year_month,
      device_ts: now,
      createdAt: now,
      updatedAt: now,
    });
    await checkIsOrderIssued(consumer_no).then(async res1=>{
      if (res1?.length > 0) {
        await dbConnection("Orders")
          .where("consumer_no", consumer_no)
          .update({
            order_status: "CLOSE",
            updatedAt: now,
          })
        }
    });
    return { status: 200, message: "Bill Paid" };
  } catch (err) {
    throw err;
  } finally {
    dbConnection.destroy();
  }
};

const addEventWithOrder = async (paymentObj) => {
  const {
    perfomed_by,
    consumer_no,
    name,
    order_no = generateOrders(),
    reason_code,
    bill_year_month,
    amount,
  } = paymentObj;
  const dbConnection = await connectDB();
  const now = new Date();
  try {
    await dbConnection("Events").insert({
      id: generateId(),
      perfomed_by,
      consumer_no,
      name,
      state: "DISCONNECTED",
      remarks: "PAYMENT NOT DONE",
      reason: "PAYMENT NOT DONE",
      reason_code,
      order_no,
      amount,
      bill_year_month,
      device_ts: now,
      createdAt: now,
      updatedAt: now,
    });
    await dbConnection("Orders").insert({
      id: generateId(),
      order_name: "prepaid-electricity",
      consumer_no,
      order_no,
      amount,
      order_status: "DONE",
      revision: 0,
      reason_code: "NA",
      bill_year_month,
      createdAt: now,
      updatedAt: now,
    });
    return { status: 200, message: "Connection Disconnected" };
  } catch (err) {
    throw err;
  } finally {
    dbConnection.destroy();
  }
};

module.exports = makePayment;
