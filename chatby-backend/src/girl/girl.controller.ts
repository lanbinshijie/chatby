import { Body, Controller, Get, Param, Post, Query, Request } from '@nestjs/common';
import { GirlService } from './girl.service';

@Controller('girl')
export class GirlController {
    constructor(private girlServce: GirlService){}

    @Get()
    getGirls(): any {
        return this.girlServce.getGirls();
    }

    @Post('/add')
    addGirl(@Body() body): any {
        return this.girlServce.addGirl(body);
    }

    @Get('/get')
    getGirlById(@Query() query): any {
        let id: number = parseInt(query.id);
        return this.girlServce.getGirlById(id);
    }

    @Get('/find/:id')
    findGirlById(@Param() params): any {
        let id: number = parseInt(params.id)
        return this.girlServce.getGirlById(id);
    }

}
