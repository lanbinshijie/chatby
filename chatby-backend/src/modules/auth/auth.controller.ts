
import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RCode } from 'src/common/constants/rcode';

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

    @Get('/register')
    async register(@Query() query) {
        // 获取参数username和password
        const { username, password } = query;
        // 调用service中的register方法
        let data = await this.authService.register(username, password);
        // 根据返回的code值，返回不同的状态码
        let code = data.code === RCode.OK ? 200 : 400;
        let msg = data.code === RCode.OK ? '注册成功！' : '注册失败！' + data.data;
        return {
            code: code,
            data: data.code === RCode.OK ? data.data : null,
            message: msg
        };
    }

    @Get('/login')
    async login(@Query() query) {
        // 获取参数username和password
        const { username, password, device } = query;
        // 调用service中的login方法
        let data = await this.authService.login(username, password, device, false);
        // 根据返回的code值，返回不同的状态码
        let code = data.code === RCode.OK ? 200 : 400;
        let msg = data.code === RCode.OK ? '登录成功！' : '登录失败！' + data.data;
        return {
            code: code,
            data: data.code === RCode.OK ? data.data : null,
            message: msg
        };
    }


    @Get('/selectAllUser')
    selectAllUser() {
        return this.authService.selectAllUser();
    }

}
