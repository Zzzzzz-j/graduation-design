import request from '../service/request';

/**
 * test
 */
export function testApi(params) {
    return request("get", '/users/test', params);
}
