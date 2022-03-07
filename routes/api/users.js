const express = require("express");
const router = express.Router();
const controller = require('../../controllers/userController');
const passport = require('passport');

// @route  GET api/users/test
// @desc   返回的请求的json数据
// @access public
router.get("/test", (req, res) => {
    res.json({ msg: "login works" })
})

// @route  GET api/users/test
// @desc   返回的请求的json数据
// @access public
router.post("/register", controller.regist)

// @route  POST api/users/login
// @desc   返回token jwt passport
// @access public
router.post("/login", controller.login)

// @route  GET api/users/current
// @desc   return current user
// @access Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(req.user);
}
);

// @route  POST api/users/changepwd
// @desc   返回json数据
// @access Private
router.post("/changepwd", passport.authenticate('jwt', { session: false }), controller.changepwd)

// @route  GET api/users/account/list
// @desc   return 账号列表
// @access Private
router.get('/account/list', passport.authenticate('jwt', { session: false }), controller.getAccountList);

module.exports = router;