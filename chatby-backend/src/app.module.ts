import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ChatModule } from './modules/chat/chat.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: 'localhost', // 数据库地址
      port: 3306, // 端口
      username: "chatby", // 用户名
      password: "chatby", // 密码
      database: "chatby", // 数据库名称
      retryDelay: 3000, // 重试延时
      retryAttempts: 10, // 重试次数
      synchronize: true, // 自动更新数据库
      autoLoadEntities: true, // 自动加载实体
    }),
    AuthModule,
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
