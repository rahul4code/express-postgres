const express = require("express");
const bodyParser=require("body-parser");
const getAllConsumers = require("./api/getAllConsumer");
const makePayment = require("./api/makePayment");

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

app.post("/api/makepayment",  async function (req, res) {
    const status=await makePayment(req.body)
    console.log(status, "hahaha")
    res.send(status)
  });


app.listen(PORT, () => {
  console.log("App is running");
});
