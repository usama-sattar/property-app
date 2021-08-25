const jwt = require('jsonwebtoken')

module.exports= function(req,res,next){
    const token =  req.header('auth-token')
    //req.headers.authorization.split(' ')[1];
    if(!token){
        res.status(401).send("Access denied")
    }
    try{
        const verify = jwt.verify(token, process.env.SECRET_KEY)
        req.user= verify
        next()
    }
    catch(err){
        console.log(err.response)
        console.log(err.req)
        console.log(err.message)
        
    }
}
