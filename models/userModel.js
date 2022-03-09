const db = require('./db');

module.exports = {
    getAccountList() {
        return db.query(`SELECT * FROM e_user`);
    },
    deleteByUserId(id) {
        return db.query(`DELETE FROM e_user WHERE user_id=${id}`);
    },
    getUserInfoById(id) {
        return db.query(`SELECT * FROM e_user_info WHERE user_id=${id}`);
    }
};