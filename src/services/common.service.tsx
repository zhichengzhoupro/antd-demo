import axios, {AxiosRequestConfig} from "axios";
import {message} from "antd";
import * as Util from '../common/Util'

const service = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});


const loadToken = () => {
    const token = window.localStorage.getItem('accessToken');
    return token;
}

service.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers = {Authorization: `Bearer ${loadToken()}`}
    return config;
});

service.interceptors.response.use((resp) => {

    return resp.data;

}, (error) => {
    // Do something with response error
    if(401 === error.response.status) {
        Util.removeAuthentificationFromStorage();
        Util.removeUserInfoFromStorage();
    }

});

const serviceWithOutInterceptor = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
});

export {
    service,
    serviceWithOutInterceptor
};
