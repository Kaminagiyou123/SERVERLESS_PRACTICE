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
            body:`id ${id} doesnt exist`
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
    try{
        const {records}=await airtable.list()
        const products=records.map((product)=>{
            const {id}=product;
            const {name,price,image}=product.fields
            const url=image[0].url
            return {id,name,url,price}
        })
        return {
            statusCode:200,
            body:JSON.stringify(products),
        }}
        catch(error){
            return {
                statusCode:500,
                body:JSON.stringify(products),
            }
        }
}