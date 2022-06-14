const router = require('express').Router();
const { getFirestore, getDoc, doc, updateDoc } = require("firebase/firestore");

router.get('/', async (req,res,next) => {
    res.send("Hello");
})

router.put('/', async (req,res,next) => {
    console.log("Put Request: ", req.body)
})


module.exports = router;