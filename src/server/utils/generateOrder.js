const generateOrders=()=>{
    return "Bill-" + (Math.random() * (1000 - 1 + 1) + 1).toFixed()
}

module.exports=generateOrders;