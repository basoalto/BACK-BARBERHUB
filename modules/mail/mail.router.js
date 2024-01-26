const express = require('express');
const router = express.Router();
const {createEmail} = require("./mail.controller")



router.post('/', (req, res) => {
  createEmail(req, res)
  .catch((error)=> {
    console.log(error)
    res.status(500).send("Server Error")
  })
})



module.exports = router
