import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { FriendMessages } from './entities/chat.entities';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';


@Module({
  imports: [TypeOrmModule.forFeature([FriendMessages])],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule {}
