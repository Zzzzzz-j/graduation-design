import request from '../service/request';

/**
 * test
 */
export function testApi(params) {
    return request("get", '/accounts/test', params);
}

/**
 * 注册账号
 */
export function registerAccount(params) {
    return request("post", '/accounts/register', params);
}

/**
 * 登录
 */
export function login(params) {
    return request("post", '/accounts/login', params);
}

/**
 * 获取用户信息
 */
export function getUserInfo(params) {
    return request("get", '/accounts/current', params);
}

/**
 * 修改密码
 */
export function changePassword(params) {
    return request("post", '/accounts/changepwd', params);
}

/**
 * 获取后台账号列表
 */
export function getAccountList(params) {
    return request("get", '/accounts/account/list', params);
}

/**
 * 删除账号
 */
 export function deleteAccount(params) {
    return request("post", '/accounts/delete/account', params);
}

/**
 * 获取用户账号列表
 */
 export function getUserAccountList(params) {
    return request("get", '/users/account/list', params);
}

/**
 * 删除用户账号
 */
 export function deleteUserAccount(params) {
    return request("post", '/users/delete/account', params);
}

/**
 * 获取用户账号列表
 */
 export function getUserDetails(params) {
    return request("get", '/users/details', params);
}

/**
 * 获取贷款申请列表
 */
 export function getApplicationtList(params) {
    return request("get", '/users/application', params);
}

/**
 * 贷款审批
 */
 export function examineAndApprove(params) {
    return request("post", '/users/approve', params);
}

/**
 * 编辑账号信息
 */
 export function updateAccount(params) {
    return request("post", '/accounts/update/account/info', params);
}
