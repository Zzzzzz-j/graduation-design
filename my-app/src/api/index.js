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
