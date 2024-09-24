/**
 * @Author: CuiFan
 * @Date:  2024/7/30
 * @Description: 二次封装axios
 */

import axios from 'axios';

const configData = window.electron.ipcRenderer.sendSync('getConfigData');

export const port = configData.Port;
export const webSocketPort = configData.WS_Port;
export const IP = configData.IP;
export const baseUrl = `http://${IP}:${port}`;
export const wsBaseUrl = `${IP}:${webSocketPort}`;

const service = axios.create({
    baseURL: baseUrl,
    timeout: 600 * 1000
});

/**
 * 封装request请求
 */

service.interceptors.request.use(
    (config) => {
        config.headers = {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'auth': cacheUserInfo ? JSON.parse(cacheUserInfo).AuthToken : '',
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
const CODE_TO_MSG = {};
/**
 * 封装response返回
 */
service.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            let responseData = response.data;
            let obj = {
                data: [],
                total: ''
            };
            if (
                responseData.type === 'application/octet-stream' ||
                responseData.type === 'application/pdf' ||
                responseData.type === 'application/zip'
            ) {
                return Promise.resolve(responseData);
            }
            if (!responseData.Errors) {
                obj.data = responseData.Data ?? [];
                obj.total = responseData.Total;
                return Promise.resolve(obj);
            }
            // 错误码预先判断
            const code = responseData.Errors[0].Code;
            const msg = responseData.Errors[0].Msg;
            return Promise.reject({
                code: code || 0,
                msg: msg || 'Connect Server Error'
            });
        }
    },
    (error) => {
        if (error && error.response) {
            let errCode = error.response.data.Errors[0].Code;
            error.message = CODE_TO_MSG[errCode];
            // error.message = ERROR_CODE[errMsg.Code] ?? `Connect Error : ${error.response.status}`;
            // ElMessage.error(error.message);
        } else {
            // if (JSON.stringify(error).includes("timeout")) {
            //     ElMessage.error("Connect Server Timeout .");
            // }
            error.message = 'Connect Server Timeout .';
        }
        return Promise.reject({
            code: error.Code,
            msg: error.message
        });
    }
);

export default service;
