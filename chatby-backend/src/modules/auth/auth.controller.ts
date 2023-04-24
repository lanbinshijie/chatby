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
    register(@Query() query) {
        // 获取参数username和password
        const { username, password } = query;
        let data = this.authService.register(username, password);
        let code = data.code === RCode.OK ? 200 : 400;
        return {
            code: code,
            data: data.data,
            message: '注册成功！'
        };
    }

}
