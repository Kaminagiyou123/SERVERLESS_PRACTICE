require('dotenv').config()
const nodemailer=require('nodemailer')
const {EMAIL_HOST,EMAIL_PORT,EMAIL_USER,EMAIL_PASSWORD}=process.env
const mailConfig = {
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
    }};
const transporter = nodemailer.createTransport(mailConfig);

exports.handler= async (event,context,cb)=>{

    const method=event.httpMethod
    if (method!=="POST"){
        return {
            statusCode:405,
            body:"only POST requests allowed",
        }   
    }
    const {name,email,subject,message}=JSON.parse(event.body);
    if (!name||!email||!subject||!message){
        return {
            statusCode:405,
            body:"please send all fields",
        }
    }
    const data={
        from :'John Doe <John@gmail.com>',
        to:`${name}<${email}>`,
        subject:subject,
        html:`<p>${message}</p>`
    }
    try{
        await transporter.sendMail({...data})

        return {
            statusCode:200,
            body:"success",
        } 
    }catch(error){
        return {
            statusCode:405,
            body:JSON.stringify(error,message),
        }
    }


}