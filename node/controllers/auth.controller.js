var authModel = require('../models/auth.model');
var jwt = require('jsonwebtoken');
var tokenSecret = require('../modules/tokenSecret');
var ObjectID = require('mongodb').ObjectID;
// var ObjectID = require('')

exports.signup =  (req,res,next)=>{
    var newUser = new authModel.User(req.body);
    newUser.save((err,result)=>{
        if(err){
            res.status(400).send({error: true, message: err});
        }
        else{
            var user = {email: result.email, _id: result._id};
            var a_token = generateAccessToken(user);
            var r_token = jwt.sign(user, tokenSecret.RT_Secret);
            res.send({data:result, a_token: a_token, r_token: r_token});
        }
    })
}

exports.login = (req,res,next)=>{
    authModel.User.find(
        { email: req.body.email, password: req.body.password }
    ).then((result)=>{
        if(result.length > 0){
            var user = {email: result[0].email, _id: result[0]._id};
            var a_token = generateAccessToken(user);
            var refreshToken = jwt.sign(user, tokenSecret.RT_Secret);
            res.send({data: result[0], a_token: a_token, r_token: refreshToken});
        }
        else{
            res.send({error: true, message:'Please check your email or password', userNotFound: true});
        }
    })
}

exports.authenticate = (req,res,next)=>{
    authModel.User.find(
        { email: req.body.email, _id:  ObjectID(req.body._id)}
    ).then((result)=>{
        if(result.length > 0){
            res.send(result[0]);
        }
        else{
            res.send({error: true, message:'User not found', userNotFound: true});
        }
    })
}

exports.refreshToken = (req,res,next)=>{
    var a_token = generateAccessToken({ email: req.body.email, _id: req.body._id});
    res.send({a_token: a_token});
}


function generateAccessToken(user) {
    return jwt.sign(user, tokenSecret.AT_Secret, { expiresIn: "10s" });
}