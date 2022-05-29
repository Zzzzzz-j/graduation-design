const db = require('./db');

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
    },
    updatePassword(password,id) {
        return db.query(`UPDATE t_user SET password='${password}' WHERE user_id=${id}`)
    },
    getAccountList() {
        return db.query(`SELECT * FROM t_user`);
    },
    getAccountListAsSearch(search) {
        return db.query(`SELECT * FROM t_user WHERE username like '%${search}%'`);
    },
    deleteByUserId(id) {
        return db.query(`DELETE FROM t_user WHERE user_id=${id}`);
    },
    updateAccount(username, id) {
        return db.query(`UPDATE t_user SET username='${username}' WHERE user_id=${id}`)
    },
};