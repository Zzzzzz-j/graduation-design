import request from '../service/request';

/**
 * test
 */
export function testApi(params) {
    return request("get", '/users/test', params);
}

/**
 * 注册账号
 */
export function registerAccount(params) {
    return request("post", '/users/register', params);
}

/**
 * 登录
 */
export function login(params) {
    return request("post", '/users/login', params);
}

/**
 * 获取用户信息
 */
export function getUserInfo(params) {
    return request("get", '/users/current', params);
}

/**
 * 修改密码
 */
export function changePassword(params) {
    return request("post", '/users/changepwd', params);
}

/**
 * 获取账号列表
 */
export function getAccountList(params) {
    return request("get", '/users/account/list', params);
}
