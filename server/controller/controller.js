const AWS = require('aws-sdk');
AWS.config.update({
    region:'us-west-2',
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
    
});
const ses=  new AWS.SES({apiVersion:'2010-12-01'});
exports.register = (req, res) => {
    const {user,email,password} = req.body;
    const params = {
        Source:process.env.EMAIL_FROM,
        Destination:{
            ToAddresses:[email]
        },
        ReplyToAddresses:[process.env.EMAIL_TO],
        Message:{
            Body:{
                Html:{
                    Charset:'UTF-8',
                    Data:`<html><body> <h1>Hello ${user}</h1></body></html>`
                }
            },
            Subject:{
                Charset:'UTF-8',
                Data:'Complete Your Registeration'
            }
        }
    }


    const sendEmailOnRegister = ()=> ses.sendEmail(params).promise()

    sendEmailOnRegister().then(data =>{
        console.log(data)
    }).catch(err => {
        console.log(err);
        res.json('Sendind Email Failed');
    })
    };