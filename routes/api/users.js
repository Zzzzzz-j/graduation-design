const express = require("express");
const router = express.Router();
const controller = require('../../controllers/userController');

// @route  GET api/users/test
// @desc   返回的请求的json数据
// @access public
router.get("/test",(req,res) => {
    res.json({msg:"login works"})
})

// @route  GET api/users/test
// @desc   返回的请求的json数据
// @access public
router.post("/register",controller.regist)

module.exports = router;