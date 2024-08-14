import express from 'express';

import { Router } from 'express';

import User from '../mongoose/models/UserModel.js';

import Auction from '../mongoose/models/AuctionModel.js';

const AppRoute = Router();

AppRoute.get('/',(req,res)=>{

    res.json({code:404,msg:'404 PAGE NOT FOUND!'});

});

AppRoute.post('/createuser',(req,res)=>{

    var condition = { email: req.body.email };

    User.find(condition)
  .then(users => {
    if (users.length > 0) {

        res.json({code:404,msg:'Error : Email already exist!',data:[]});
        
    } else {
        res.json({code:200,msg:'USER INFO'});
    }
  })
  .catch(err => {
    console.error('Error:', err);
  });

   
    // var UserNew = User({

    //     username:req.body.username,
    //     email:req.body.email,
    //     password:req.body.password

    // });

    // UserNew.save();
    
    // res.json({code:200,msg:'USER INFO',data:req.body.username});

});

AppRoute.get('/getUser',(req,res)=>{
   
    res.json({code:200,msg:'USER INFO',data:[]});

});

export default AppRoute;