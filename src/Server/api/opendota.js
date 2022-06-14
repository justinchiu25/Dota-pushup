const router = require('express').Router();

router.get('/', async(req,res,next) => {
    res.send("Hello");
})

router.put('/', async(req,res,next) => {
    console.log("Put Request: ", req.body)
})


module.exports = router;