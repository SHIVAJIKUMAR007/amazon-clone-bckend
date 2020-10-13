const express = require("express");
const router = express.Router();
const parser = require("body-parser");
const {userModel} = require("../db");

router.post('/signup',(req,res)=>{
    console.log(req.body)
    userModel.find({username : req.body.username}).exec((err,data)=>{
        if(data.length >0 ){
            if(err ) throw err
            res.send('User already exist, try other username')
        }
        else{
            userModel.create({
                username:req.body.username,
                name: req.body.fname,
                email : req.body.email,
                password : req.body.pass
            },(err2 , data2 )=>{
                if(err2 ) throw err2
                const sendData = {
                    username:data2.username,
                    name: data2.name,
                    email : data2.email,
                    password : ''
                }
                res.send(sendData)
            })
        }
    })
})

router.get('/signup',(req,res)=>{
    userModel.find({}).exec((err,data)=>{
        res.send(data)
    })
})


router.post('/login',(req,res)=>{
    userModel.find({username : req.body.username}).exec((err,data)=>{
        if(err ) throw err
        console.log(data)
        if(data.length == 0 ){
            res.send('User did not exist, try other username or signup first')
        }
        else if(data.length > 0){
            console.log(data[0].password,req.body.pass)
            if( data[0].password == req.body.pass){
                const sendData = {
                    username:data[0].username,
                    name: data[0].name,
                    email : data[0].email,
                    password : ''
                }
                res.send(sendData)
            }else{
                res.send('Your password is wrong, try other password')
            }
        }
    })
})


module.exports = router;
