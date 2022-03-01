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
