require('dotenv').config()

const Airtable = require('airtable-node');
 
const airtable = new Airtable({ apiKey: process.env.API_KEY})
  .base('appbPHLNo1J4c21uE')
  .table('survey')

exports.handler= async (event,context,cb)=>{
const method=event.httpMethod;
if (method==='GET'){
    try{
    var {records}=await airtable.list()
    var records=records.map((item)=>{
        const {id,fields:{room,votes}}=item
        return {id,room,votes}
    })
    return {
        statusCode:200,
        body:JSON.stringify(records),
    }}
    catch(error){
        return {
            statusCode:500,
            body:JSON.stringify(records),
        }
    }
}
if (method==='PUT'){
try{ const {id,votes}=JSON.parse(event.body)
if (!id||!votes){
    return {
        statusCode:400,
        body:'please provide both id and vote'
    }
}

const fields={votes:Number(votes)+1}
const item =await airtable.update(id,{fields})
if (item.error){
    return {
        statusCode:400,
        body:JSON.stringify(item)
    }
}
return {
    statusCode:200,
    body:JSON.stringify(item)
}

} catch(error){

    return {
        statusCode:400,
        body:JSON.stringify(item)
    }
}
}
  // default response
  return {
      statusCode:405,
      body:'only GET and PUT requests allowed'
  }  
}