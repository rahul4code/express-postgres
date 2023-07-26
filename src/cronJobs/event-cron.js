const cron = require('node-cron');
const getPendingPayments = require('../server/api/getPendingPayments');
const cronScheduleFormat=require('./../server/utils/constant.js')

function triggerCron(){
    cron.schedule(cronScheduleFormat,async ()=>{
        try {
            const test = await getPendingPayments()
            console.log(test,"TEST");
          } catch (error) {
            console.error("Error executing cron job:", error);
          }
    })
}

module.exports=triggerCron;
