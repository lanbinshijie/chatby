import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as cors from 'cors';


function MiddleWareAll(req: any, res: any, next: any) {
  console.log('已经进入全局中间件…………');
  next();
}


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(MiddleWareAll);
  app.use(cors())
  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
