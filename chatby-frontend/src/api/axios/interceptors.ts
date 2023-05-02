import { message } from 'ant-design-vue';
import { AxiosResponse } from 'axios';

interface GeneralResponse extends AxiosResponse {
    code: number;
    message: string;
}

export const requestFail = (error: any) => {
    return Promise.reject(error);
}

export const responseSuccess = (response: AxiosResponse) => {
    if(response.data.code !== 200) {
        message.error(response.data.message);
        return Promise.reject(response.data);
    }
    return response;
}

export const responseFail = (error: any) => {
    message.error(error.data.message);
    return Promise.reject(error);
}
