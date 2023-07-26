const cron = require('node-cron');
const getPendingPayments = require('../server/api/getPendingPayments');
const createOrders = require('../server/api/createOrder');
const formatMultipleOrders = require('../server/utils/formatMultipleOrders');
const removePendingEvents=require('../server/api/removePendingEvents')

const cronScheduleFormat='* * * * *'

function triggerCron(){
    cron.schedule(cronScheduleFormat,async ()=>{
        try {
            getPendingPayments().then(data=>{
              if(data?.length>0){
                createOrders(formatMultipleOrders(data)).then(res=>{
                  if(res.status===200){
                    if(data?.length>0){
                      data.forEach(async item=>await removePendingEvents(item))
                    }
                  }
                })
              }
            })
          } catch (error) {
            console.error("Error executing cron job:", error);
          }
    })
}

module.exports=triggerCron;
