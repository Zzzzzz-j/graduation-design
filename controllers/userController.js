const model = require('../models/userModel')
const jwt = require('jsonwebtoken');

module.exports = {
    async login(req, res) {
        const { password, phone } = req.body;
        const phoneResults = await model.getUserByPhone(phone);
        if (phoneResults.length > 0) {
            const pwdResults = await model.getUserByPassword(phone,password);
            console.log('pwdResults',pwdResults);
            if (pwdResults.length > 0) {
                const { user_id, username, phone, password } = pwdResults[0];
                const rule = {
                    id: user_id,
                    name: username,
                    phone: phone,
                    password: password
                };
                jwt.sign(rule, 'secret', { expiresIn: 1000 * 60 * 60 * 24 }, (err, token) => {
                    if (err) throw err;
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                });
            } else {
                res.json({ status: 1001, message: '密码错误!' })
            }
        } else {
            res.json({ status: 1001, message: '该手机号还未注册!' })
        }
    },
    async regist(req, res) {
        const { username, password, phone } = req.body;
        const result = await model.getUserByPhone(phone);
        if (result.length > 0) {
            res.status(200).json({ status: 1001, message: '该手机号已被注册!' });
        } else {
            const results = await model.saveUser(username, password, phone);
            if (results.insertId) { // 通过判断insertId是不是有正常值，如果有，说明插入成功
                res.status(200).json({ status: 200, message: '注册成功!' });
            } else {
                await res.status(200).json({ status: 1002, message: '注册失败!' });
            }
        }
    },
    async checkUser(ctx) {
        let { username } = ctx.query;
        let results = await model.getUserByUsername(username);
        if (results.length > 0) {
            ctx.body = "fail";
        } else {
            ctx.body = "success";
        }
    }
}