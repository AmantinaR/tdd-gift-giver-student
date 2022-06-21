const express = require("express");
const router = express.Router();
const { BadRequestError } = require('../utils/errors');

//import res from "express/lib/response";
const GiftExchange = require('../models/gift-exchange');

router.post("/pairs", function(request, response, next) {
    
    try{
        console.log(request.body);
        if (!request.body || !request.body.names){
            throw(new BadRequestError())
        }
        let results = GiftExchange.pairs(request.body.names);
        //let results = [];
        response.status(200).json(results);
    } catch(error){
        next(error);
    }
});

router.post("/traditional", function(request, response, next) {
    try{
        console.log(request.body);
        if (!request.body || !request.body.names){
            throw(new BadRequestError())
        }
        let results = GiftExchange.traditional(request.body.names);
        response.status(200).json(results);
    } catch(error){
        next(error);
    }
});




module.exports = router;