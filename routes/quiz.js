const express = require("express");
const router = express.Router();
const { BadRequestError } = require('../utils/errors');

//import res from "express/lib/response";
const GiftExchange = require('../models/gift-exchange');



router.get("/", function(request, response, next) {
    let results = GiftExchange.quiz();
    response.status(200).json(results);
});

router.post("/", function(request, response, next) {
    let result = GiftExchange.quizResults(request.body.answers);
    response.status(200).json(result);
});

module.exports = router;