import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { FriendMessages, FriendRelation } from './entities/chat.entities';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TokenGuardMiddleware } from 'src/common/middleware/token-guard/token-guard.middleware';
import { AuthToken } from '../auth/entities/authToken.entities';
import { AuthService } from '../auth/auth.service';
import { Auth } from '../auth/entities/auth.entities';


@Module({
  imports: [TypeOrmModule.forFeature([FriendMessages, AuthToken, Auth, FriendRelation])],
  controllers: [ChatController],
  providers: [ChatService, AuthService]
})
export class ChatModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(TokenGuardMiddleware).forRoutes('chat')
  }
}
