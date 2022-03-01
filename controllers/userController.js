const model = require('../models/userModel')

module.exports = {
    async login(req, res) {
        // 3. 连接数据库
        let results = await model.getUserByNameAndPwd(username, password);
        console.log(results)
        // 4. 根据查询的结果跳转(或输出)不同的结果页面
        if (results.length > 0) {
            // redirect重定向: 它会将页面的地址重新定向到指定的路由
            // 向session作用域中存放loginUser变量
            ctx.session.loginUser = results[0].nickname;
            ctx.session.userId = results[0].user_id;
            ctx.redirect("/");
        } else {
            await ctx.render('error-login', {
                message: '登陆失败，用户名或密码错误!'
            })
        }
    },
    async regist(req, res) {
        const { username, password, phone } = req.body;
        let results = await model.saveUser(username, password, phone);
        if (results.insertId) { // 通过判断insertId是不是有正常值，如果有，说明插入成功
            res.status(200).json({message: '注册成功!'});
        } else {
            await ctx.render('error', {
                message: '注册失败!'
            });
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