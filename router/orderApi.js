const express = require("express");
const router = express.Router();
const parser = require("body-parser");
const {orderModel} = require("../db");


router.post('/order',(req,res)=>{
    const dataToInsert = {
        name : req.body.name,
        address : req.body.address,
        cartItem : req.body.cartItem,
        gt : req.body.grandTotle,
        otp : req.body.otp,
        time : new Date(),
        deliver : false
    }
     orderModel.create(dataToInsert,(err,data)=>{
         if(err) throw err
         res.send(data)
     })
})


router.get('/order',(req,res)=>{
    orderModel.find({deliver:false}).exec((err,response)=>{
        res.send(response)
    })
})


router.post('/checkotp',(req,res)=>{
    orderModel.find({_id:req.body.id}).exec((err,data)=>{
        if(err) throw err
        if(data[0].otp != req.body.otp)
         res.send('otp does not match, item not deliverd');
        else{
            orderModel.updateOne({_id:req.body.id},{deliver:true}).exec((err2,data2)=>{
                if(err2 ) throw err2
                console.log(data2)
                 res.send('otp matched, item is deliverd');
            })
        }
    })
})







module.exports = router;