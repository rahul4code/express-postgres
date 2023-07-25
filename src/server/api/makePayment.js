const connectDB = require("../models/database.js");

async function makePayment(paymentObj) {
  const {
    perfomed_by,
    consumer_no,
    name,
    state,
    order_no="Bill-"+(Math.random()* (1000 - 1 + 1) + 1).toFixed(),
    reason,
    reason_code,
    bill_year_month,
    willPay,
    amount,
    remarks
  } = paymentObj;

  let res = {};
  const now=new Date()
  if (willPay) {
    const dbConnection = await connectDB();
    try {
      res = await dbConnection("Events").insert({
        id: Math.floor(Math.random()* (1000 - 1 + 1) + 1),
        perfomed_by,
        consumer_no,
        name,
        remarks,
        reason,
        reason_code,
        order_no,
        amount,
        bill_year_month,
        device_ts:now,
        createdAt: now,
        updatedAt: now
      });
    } catch (err) {
      res = err;
    } finally {
      dbConnection.destroy();
    }
    res = {status:200, message:"Bill Paid"};
  }else{
    const dbConnection = await connectDB();
    try {
        await dbConnection("Events").insert({
            id: Math.floor(Math.random()* (1000 - 1 + 1) + 1),
            perfomed_by,
            consumer_no,
            name,
            state:"DISCONNECTED",
            remarks:"PAYMENT NOT DONE",
            reason:"PAYMENT NOT DONE",
            reason_code,
            order_no,
            amount,
            bill_year_month,
            device_ts:now,
            createdAt: now,
            updatedAt: now
          });
          await dbConnection("Orders").insert({
            id: Math.floor(Math.random()* (1000 - 1 + 1) + 1),
            order_name:"prepaid-electricity",
            consumer_no,
            order_no,
            amount,
            order_status:"DONE",
            revision:0,
            reason_code:"NA",
            bill_year_month,
            createdAt:now,
            updatedAt: now
          });
          res = {status:200, message:"connection disconnected"};
        } catch (err) {
          res = err;
        } finally {
          dbConnection.destroy();
        }
  }

  console.log(res, "final");
  return res;
}

module.exports = makePayment;
