const db = require('../models/db');

module.exports = {
    getUserByNameAndPwd(username, password) {
        return db.query(`SELECT * FROM t_user where username='${username}' and password='${password}'`);
    },
    saveUser(username, password, phone) {
        return db.query(`insert into t_user set ?`, { username, password, phone });
    },
    getUserByPhone(phone) {
        return db.query(`SELECT * FROM t_user where phone='${phone}'`);
    },
    getUserByPassword(phone,password) {
        return db.query(`SELECT * FROM t_user where phone='${phone}' and password='${password}'`);
    }
};