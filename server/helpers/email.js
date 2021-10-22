exports.registerEmailParams = (email,token)=>{
    return {
        Source:process.env.EMAIL_FROM,
        Destination:{
            ToAddresses:[email]
        },
        ReplyToAddresses:[process.env.EMAIL_TO],
        Message:{
            Body:{
                Html:{
                    Charset:'UTF-8',
                    Data:`<html>
                        <body>
                            <h1>Hi!! Please </h1><h2>Verify Your Email</h2>
                                    <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                        </body>
                    </html>`
                }
            },
            Subject:{
                Charset:'UTF-8',
                Data:'Complete Your Registeration'
            }
        }
    }
};

exports.forgotPasswordEmailParams = (email,token)=>{
    return {
        Source:process.env.EMAIL_FROM,
        Destination:{
            ToAddresses:[email]
        },
        ReplyToAddresses:[process.env.EMAIL_TO],
        Message:{
            Body:{
                Html:{
                    Charset:'UTF-8',
                    Data:`<html>
                        <body>
                            <h1>Hi!! Please </h1><h2>Reset Your Password</h2>
                                    <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
                        </body>
                    </html>`
                }
            },
            Subject:{
                Charset:'UTF-8',
                Data:'Reset Your Password'
            }
        }
    }
}