import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { GirlController } from './girl.controller';
import { GirlService } from './girl.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Girl } from './entities/girl.entities';
import { CounterMiddleware } from '../counter/counter.middleware'
import { BoyService } from '../boy/boy.service';


@Module({
  imports: [TypeOrmModule.forFeature([Girl])],
  controllers: [GirlController],
  providers: [
  BoyService,
  {
    provide: 'girl',
    useClass: GirlService,
  },{
    provide: 'girlArray',
    useValue: ['小红', '小绿', '小蓝', '小紫']
  },{
    provide: 'MyFactory',
    useFactory(){
      console.log('useFactory-----------');
      return `console.log('useFactory-----------');`
    }
  }]
})
export class GirlModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CounterMiddleware)
      .forRoutes({
        path: 'girl',
        method: RequestMethod.GET
      });
  }
}
