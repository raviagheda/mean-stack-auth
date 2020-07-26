var jwt = require('jsonwebtoken');
var tokenSecret = require('./tokenSecret');

exports.tokenVerification = (req,res,next)=>{

    var Secret_KEY = tokenSecret.AT_Secret;
    if(req.body.refreshToken){
        Secret_KEY = tokenSecret.RT_Secret;
    }

    if(req.headers && req.headers.authorization){
        var authorization = req.headers.authorization.split(' ')[1],
        decoded;
        try{
            decoded = jwt.verify(authorization, Secret_KEY);
            req.body._id = decoded._id;
            req.body.email = decoded.email;
            next();
        }
        catch(e){
            res.json({error: true,tokenExpired:true, message: "Token Expired" });
        }
    }
    else{
        // res.status(400).json({error: true, message: 'Token not found, please send Bearer token from authorization '});
        res.json({error: true, message: "Token not found in header", tokenNotFoudn: true});
    }
}