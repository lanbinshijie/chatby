
import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RCode } from 'src/common/constants/rcode';
import { AuthLoginDto, AuthRegisteryDto } from '../dtos/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Get('/version')
    version() {
        return {
            code: 200,
            data: {
                version: '1.0.0'
            },
            message: '获取版本号成功！'
        };
    }

    @Post('/register')
    async register(@Body() body: AuthRegisteryDto) {
        // 调用service中的register方法
        let data = await this.authService.register(body);
        // 根据返回的code值，返回不同的状态码
        let code = data.code === RCode.OK ? 200 : 400;
        let msg = data.code === RCode.OK ? '注册成功！' : '注册失败！' + data.data;
        return {
            code: code,
            data: data.code === RCode.OK ? data.data : "",
            message: msg
        };
    }

    @Post('/login')
    async login(@Body() body: AuthLoginDto) {
        // 获取参数username和password
        const { username, password, device } = body;
        // 调用service中的login方法
        let data = await this.authService.login(username, password, device, false);
        // 根据返回的code值，返回不同的状态码
        let code = data.code === RCode.OK ? 200 : 400;
        let msg = data.code === RCode.OK ? '登录成功！' : '登录失败！' + data.data;
        return {
            code: code,
            data: data.code === RCode.OK ? data.data : "",
            message: msg
        };
    }

    @Post('/loginByToken')
    async loginByToken(@Body() body: AuthLoginDto) {
        // 获取参数username和token
        const { username, password, device } = body;
        // 调用service中的login方法
        let data = await this.authService.login(username, password, device, true, true);
        // 根据返回的code值，返回不同的状态码
        let code = data.code === RCode.OK ? 200 : 400;
        let msg = data.code === RCode.OK ? '登录成功！' : '登录失败！' + data.data;
        return {
            code: code,
            data: data.code === RCode.OK ? data.data : "",
            message: msg
        };
    }

    @Get('/selectAllUser')
    selectAllUser() {
        return this.authService.selectAllUser();
    }

    // 获取请求者的IP地址
    @Get('/ip')
    getIp(@Request() request) {

        return {
            code: 200,
            ip: request.headers['x-forwarded-for'] || request.connection.remoteAddress,
            message: '获取IP地址成功！'
        }
    }

}
