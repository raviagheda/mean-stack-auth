var authModel = require('../models/auth.model');

exports.isEmailExist = (req,res,next)=>{
    authModel.User.find(
        {email: req.body.email}
    ).then((result)=>{
        if(result.length > 0){
            res.send({error: true, message: 'Email alredy exist', emailExist: true});
        }
        else{
            next();
        }
    });
}