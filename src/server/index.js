const express = require("express");
const bodyParser=require("body-parser");
const getAllConsumers = require("./api/getAllConsumer");
const makePayment = require("./api/makePayment");
const requestConnection = require("./api/requestConnection");
const getPendingPayments = require("./api/getPendingPayments");
// const triggerCron = require("../cronJobs/event-cron");
const cron=require("node-cron")

const app = express();
const PORT = "8000";

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", async function (req, res) {
  res.send("Welcome to the app !! Ready to call the API");
});

app.get("/api/getAllConsumers", async function (req, res) {
  const data = await getAllConsumers();
  await res.send(data);
});

app.get("/api/getPendingPayments", async function (req, res) {
  const data = await getPendingPayments();
  await res.send(data);
});

app.post("/api/makepayment",  async function (req, res) {
  try{
    const status=await makePayment(req.body)
    console.log(status, "Status")
    res.send(status)
  }catch(err){
    res.status(500).send(err.message)
  }
});

app.post("/api/requestConnection",  async function (req, res) {
  try{
    const status=await requestConnection(req.body)
    console.log(status, "Status")
    res.send(status)
  }catch(err){
    res.status(500).send(err.message)
  }
});

// cron.schedule('* * * * *',()=>{
//   console.log(getPendingPayments(),"Called")
// })

app.listen(PORT, () => {
  console.log("App is running");
});
