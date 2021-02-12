require('dotenv').config()
const axios=require('axios')
const url='https://api.buttondown.email/v1/subscribers'
exports.handler= async (event,context,cb)=>{
    const method=event.httpMethod;
    if (method!=='POST'){
        return {
            statusCode:405,
            body:'only POST request accepted'
        }
    }
    const {email}=JSON.parse(event.body)
    if (!email){
        return {
            statusCode:400,
            body:'Please provide email value'
        }
    }

    try { const data=await axios.post(url,{email},{headers:{
        Authorization: `Token ${process.env.EMAIL_KEY}`
    }})

    return {
        statusCode:201,
        body:"New account created",
    }

    } catch(error){

        return {
            statusCode:400,
            body:JSON.stringify(error.response.data),
        }
    }


}