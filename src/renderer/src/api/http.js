/**
 * @Author: CuiFan
 * @Date:  2024/7/30
 * @Description: 二次封装请求
 */
import request from './request';

const http = {
    /**
     * 封装get请求
     * @param url
     * @param params
     * @param type
     */
    get(url, params, type) {
        const config = {
            method: 'get',
            url: url,
            params: params,
            responseType: type,
            cache: false
        };
        return request(config);
    },

    /**
     * 封装post请求
     * @param url
     * @param params
     * @param con   其他配置
     */
    post(url, params, con) {
        const config = {
            method: 'post',
            url: url,
            data: params,
            ...con
        };
        return request(config);
    },

    /**
     * put
     * @param url
     * @param params
     */
    put(url, params) {
        const config = {
            method: 'put',
            url: url,
            data: params
        };
        return request(config);
    },

    /**
     * 封装delete请求
     * @param url
     * @param params
     */
    delete(url, params) {
        const config = {
            method: 'delete',
            url: url,
            params: params
        };
        return request(config);
    },

    /**
     * putFormData
     * @param url
     * @param formData
     */
    putFormData(url, formData) {
        const config = {
            headers: { 'Content-type': 'multipart/form-data' },
            method: 'put',
            url: url,
            data: formData
        };
        return request(config);
    }
};

export default http;
