import { message } from 'ant-design-vue';
import { AxiosRequestConfig, AxiosResponse } from 'axios';



export const requestSuccess = (request: AxiosRequestConfig) => {
    return request;
};

export const requestFail = (error: any) => {
    return Promise.reject(error);
}

export const responseSuccess = (response: AxiosResponse) => {
    return response.data;
}

export const responseFail = (error: any) => {
    message.error(error.message);
    return Promise.reject(error);
}
