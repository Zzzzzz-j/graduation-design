const model = require('../models/userModel')

module.exports = {
    async getAccountList(req, res) {
        const { pageNum, pageSize } = req.query;
        const results = await model.getAccountList();
        const length = results.length;
        if (length > 0) {
            results.reverse();
            if(parseInt(pageNum) * parseInt(pageSize) > length) {
                res.json({
                    pageNum: pageNum,
                    pageSize: pageSize,
                    total: length,
                    status: 200,
                    state: 1,
                    data: [...results.slice((pageNum - 1) * 10)]
                })
            } else {
                res.json({
                    pageNum: pageNum,
                    pageSize: pageSize,
                    total: length,
                    status: 200,
                    state:2,
                    data: [...results.slice((pageNum - 1) * 10 , pageNum * 10)]
                })
            }
        } else {
            await res.status(404);
        }
    },
    async deleteAccount(req, res) {
        const { id } = req.body;
        const results = await model.deleteByUserId(id);
        if (results.affectedRows) {
            res.status(200).json({ status: 200, message: '删除成功!' });
        } else {
            await res.status(200).json({ status: 1001, message: '删除失败!' });
        }
    },
    async getUserDetails(req, res) {
        const { id } = req.query;
        const results = await model.getUserInfoById(id);
        if (results.length > 0) {
            res.json({ status: 200, data: results[0] })
        } else {
            await res.status(404);
        }
    },
}