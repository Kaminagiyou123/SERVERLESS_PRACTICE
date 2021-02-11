require('dotenv').config()

const Airtable = require('airtable-node');
 
const airtable = new Airtable({ apiKey: process.env.API_KEY})
  .base('appbPHLNo1J4c21uE')
  .table('products')

exports.handler= async (event,context,cb)=>{
    const {id}=event.queryStringParameters
    if (id){
   try{const product= await airtable.retrieve(id)

    if (product.error){
        return {
            statusCode:400,
            body:`please provide valid id, id ${id} doesnt exist`
        }
   }

   return {
    statusCode:200,
    body:JSON.stringify(product)
}

} catch(error){

   }
   return {
       statusCode:200,
       body:'single product'
   }
    }

return {
    statusCode:400,
    body:"please provide product id"

}
}