const generateId=()=>{
    return Math.floor(Math.random() * (1000 - 1 + 1) + 1);
}

module.exports=generateId;