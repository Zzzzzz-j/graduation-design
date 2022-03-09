const express = require("express");
const router = express.Router();
const controller = require('../../controllers/userController');
const passport = require('passport');

// @route  GET api/users/account/list
// @desc   return 账号列表
// @access Private
router.get('/account/list', passport.authenticate('jwt', { session: false }), controller.getAccountList);

// @route  GET api/users/delete/account
// @desc   return success
// @access Private
router.post('/delete/account', passport.authenticate('jwt', { session: false }), controller.deleteAccount);

module.exports = router;