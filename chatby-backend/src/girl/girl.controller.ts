import { Controller, Get } from '@nestjs/common';

@Controller('girl')
export class GirlController {
    @Get()
    getGirls(): any {
        return {
            code: 0,
            data: ['小美', '小红', '翠花'],
            msg: "请求女孩列表成功"
        }
    }
}
