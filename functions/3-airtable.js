
require('dotenv').config()

const Airtable = require('airtable-node');
 
const airtable = new Airtable({ apiKey: process.env.API_KEY})
  .base('appbPHLNo1J4c21uE')
  .table('products')

exports.handler= async (event,context,cb)=>{
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