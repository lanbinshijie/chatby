import { Body, Controller, Get, Inject, Param, Post, Query, Request } from '@nestjs/common';
import { GirlService } from './girl.service';
import { BoyService } from '../boy/boy.service';


@Controller('girl')
export class GirlController {
    constructor(
        @Inject('girl') private girlServce: GirlService,
        @Inject('girlArray') private girls: string[],
        @Inject('MyFactory') private myFactor: string,
        @Inject('Config') private shopName: string,
        private BoyService: BoyService,
    ){}

    @Get('/add')
    addGirl(@Body() body): any {
        return this.girlServce.addGirl();
    }

    @Get('/del/:id')
    delGirl(@Param() params): any {
        let id: number = parseInt(params.id);
        return this.girlServce.delGirl(id);
    }

    @Get('/update/:id')
    updateGirl(@Param() params): any {
        let id: number = parseInt(params.id);
        return this.girlServce.updateGirl(id);
    }

    @Get()
    getGirls(): any {
        return this.girlServce.getAllGirls();
    }

    @Get('/test')
    test(): any {
        return this.BoyService.findAll();
    }

    @Get('/test2')
    test2(): any {
        return this.shopName;
    }

    @Get('/crostest')
    crostest() :object {
        return {
            code: 200,
            msg: '测试跨域请求成功'
        }
    }

    @Get('/:name')
    getGirlByName(@Param() params): any {
        let name: string = params.name;
        return this.girlServce.getGirlByName(name);
    }





}
