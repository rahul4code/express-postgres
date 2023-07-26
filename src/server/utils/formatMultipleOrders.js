const generateId=require('./generateId')

const formatMultipleOrders=(items)=>{
    const now=new Date()
    if(items.length>0){
        const formattedList=items.map(item=>{
            return {
                id: generateId(),
                order_name: "prepaid-electricity",
                consumer_no:item?.consumer_no,
                order_no:item?.order_no,
                amount:item?.amount,
                order_status: "ISSUED",
                revision: 0,
                reason_code: "NA",
                bill_year_month:item.bill_year_month,
                createdAt: now,
                updatedAt: now,
            }
        })
        return formattedList;
    }
}

module.exports=formatMultipleOrders;